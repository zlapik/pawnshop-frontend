import { useState, useEffect } from 'react'
import { format, addWeeks } from 'date-fns'
import { Formik } from 'formik'

import { Input } from '@components/small/Input'
import { InputNumber } from '@components/small/InputNumber'
import { Combobox } from '@components/small/Combobox'
import { Radio } from '@components/small/Radio'
import { Button } from '@components/small/Button'
import { SubmitModal } from '@components/small/SubmitModal'

import { apiService } from '@api/service'

import { CustomerProps, ProductValuesProps } from '@components/forms/ProductForm/ProductForm.types'
import {
  SEX_OPTIONS,
  NATIONALITY_OPTIONS,
  FORM_TYPE,
  PRODUCT_SCHEMA,
  STYLE_ROW_FORM,
  PRODUCT_INIT_VALUES
} from '@components/forms/ProductForm/ProductForm.const'

const ProductForm = () => {
  const [isBuy, setIsBuy] = useState<boolean | string>(false)
  const [isOpen, setIsOpen] = useState(false)
  const [customers, setCustomers] = useState<CustomerProps[]>([])
  const [customerNames, setCustomerNames] = useState<any[]>([])

  useEffect(() => {
    getCustomers().then((customers) => {
      setCustomers(customers)
      setCustomerNames(customers.map((customer: any) => customer.full_name))
    })
  }, [])

  const calculatePrice = (price?: string, interest?: string) => {
    const buyPrice = Number(price)
    const interestNum = interest === '' ? 0 : Number(interest) / 100
    const priceWithInterest = buyPrice + interestNum * buyPrice * 4
    return Math.ceil(priceWithInterest / 5) * 5
  }

  const getCustomers = async (): Promise<CustomerProps[]> => {
    try {
      return await apiService.get('customer/').json()
    } catch (error) {
      console.error(error)
      return []
    }
  }

  const handleModalSubmit = (values: ProductValuesProps) => {
    const jsonObject = {
      user: 1, // todo delete user
      status: values.isBuy ? 'OFFER' : 'LOAN',
      full_name: values.name,
      residence: values.residence,
      sex: values.sex,
      nationality: values.nationality,
      personal_id: values.personalId,
      personal_id_expiration_date: values.personalIdDate,
      birthplace: values.birthplace,
      id_birth: values.birthId,
      interest_rate_or_quantity: Number(values.interestRateOrQuantity),
      inventory_id: Number(values.inventoryId),
      product_name: values.productName,
      buy_price: Number(values.buyPrice),
      sell_price: Number(values.sellPrice)
    }
    try {
      apiService.post('product/', { json: jsonObject })
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  return (
    <>
      <div className="p-8 border rounded-xl border-gray-500 shadow-2xl">
        <Formik initialValues={PRODUCT_INIT_VALUES} validationSchema={PRODUCT_SCHEMA} onSubmit={() => setIsOpen(true)}>
          {({ values, errors, handleSubmit, setFieldValue, touched, resetForm, setTouched }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className="divide-y divide-gray-400">
                  <div className="flex flex-col space-y-4 pb-6">
                    <div className="flex space-x-10 justify-center">
                      <Radio
                        className="w-40"
                        options={FORM_TYPE}
                        onChange={(value) => {
                          setIsBuy(value)
                          setFieldValue('isBuy', value)
                          setFieldValue('buyPrice', '')
                          setFieldValue('sellPrice', '')
                          setFieldValue('interestRateOrQuantity', '')
                        }}
                        value={values.isBuy}
                      />
                    </div>
                    <div className={STYLE_ROW_FORM}>
                      <Combobox
                        options={customerNames}
                        label="Meno"
                        onChange={(value) => {
                          setFieldValue('name', value)
                          const customer = customers.find((customer: any) => customer.full_name === value)
                          if (customer) {
                            setFieldValue('residence', customer.residence)
                            setFieldValue('sex', customer.sex)
                            setFieldValue('nationality', customer.nationality)
                            setFieldValue('personalId', customer.personal_id)
                            setFieldValue('personalIdDate', customer.personal_id_expiration_date)
                            setFieldValue('birthId', customer.id_birth)
                            setFieldValue('birthplace', customer.birthplace)
                            setTouched({})
                          }
                        }}
                        value={values.name}
                        errored={!!(errors.name && touched.name)}
                      />
                      <Input
                        name="residence"
                        label="Adresa"
                        onChange={(value) => setFieldValue('residence', value)}
                        value={values.residence}
                        errored={!!(errors.residence && touched.residence)}
                      />
                      <Combobox
                        label="Národnosť"
                        options={NATIONALITY_OPTIONS}
                        onChange={(value) => setFieldValue('nationality', value)}
                        value={values.nationality}
                        errored={!!(errors.nationality && touched.nationality)}
                      />
                    </div>
                    <div className={STYLE_ROW_FORM}>
                      <Input
                        name="birthId"
                        label="Rodné číslo"
                        onChange={(value) => setFieldValue('birthId', value)}
                        value={values.birthId}
                        errored={!!(errors.birthId && touched.birthId)}
                      />
                      <Input
                        name="personalId"
                        label="Číslo OP"
                        onChange={(value) => setFieldValue('personalId', value)}
                        value={values.personalId}
                        errored={!!(errors.personalId && touched.personalId)}
                      />
                      <Input
                        name="personalIdDate"
                        label="Platnosť do"
                        onChange={(value) => setFieldValue('personalIdDate', value)}
                        value={values.personalIdDate}
                        errored={!!(errors.personalIdDate && touched.personalIdDate)}
                      />
                    </div>
                    <div className="flex items-center justify-center space-x-16">
                      <Radio
                        options={SEX_OPTIONS}
                        label="Pohlavie"
                        onChange={(value) => setFieldValue('sex', value)}
                        value={values.sex}
                      />
                      <Input
                        name="birthplace"
                        label="Místo narození"
                        onChange={(value) => setFieldValue('birthplace', value)}
                        value={values.birthplace}
                        errored={!!(errors.birthplace && touched.birthplace)}
                      />
                    </div>
                  </div>
                  {/* Product info */}
                  <div className="py-6 space-y-4">
                    <div className={STYLE_ROW_FORM}>
                      <Input
                        classNameInput="w-96"
                        name="productName"
                        label="Předmet"
                        onChange={(value) => setFieldValue('productName', value)}
                        value={values.productName}
                        errored={!!(errors.productName && touched.productName)}
                      />
                      <InputNumber
                        name="inventoryId"
                        label="Inventárí číslo"
                        onChange={(value) => setFieldValue('inventoryId', value)}
                        value={values.inventoryId}
                        errored={!!(errors.inventoryId && touched.inventoryId)}
                        isDecimal
                      />
                    </div>
                    <div className={STYLE_ROW_FORM}>
                      <div className="flex space-x-4">
                        <InputNumber
                          classNameInput="w-64"
                          name="buyPrice"
                          label={isBuy ? 'Nákup' : 'Pújička'}
                          value={values.buyPrice}
                          onChange={(value) => {
                            setFieldValue('buyPrice', value)
                            if (!isBuy) {
                              setFieldValue('sellPrice', calculatePrice(value, values.interestRateOrQuantity))
                            }
                          }}
                          errored={!!(errors.buyPrice && touched.buyPrice)}
                          isDecimal
                        />
                        <InputNumber
                          classNameInput="w-16"
                          name="interestRateOrQuantity"
                          label={isBuy ? 'ks' : '%'}
                          onChange={(value) => {
                            setFieldValue('interestRateOrQuantity', value)
                            if (!isBuy) {
                              setFieldValue('sellPrice', calculatePrice(values.buyPrice, value))
                            }
                          }}
                          value={values.interestRateOrQuantity}
                          errored={!!(errors.interestRateOrQuantity && touched.interestRateOrQuantity)}
                          isDecimal={!!isBuy}
                        />
                      </div>
                      <InputNumber
                        classNameInput="w-64"
                        name="sellPrice"
                        label={isBuy ? 'Prodej' : 'K vyplacení'}
                        value={values.sellPrice}
                        onChange={(value) => setFieldValue('sellPrice', value)}
                        disabled={!isBuy}
                        errored={!!(errors.sellPrice && touched.sellPrice)}
                      />
                    </div>
                  </div>
                  <div className="flex w-full justify-between items-center pt-6">
                    <div className={STYLE_ROW_FORM}>
                      <Input
                        classNameInput="w-32"
                        name="startDate"
                        label="Uzavírají dne"
                        value={format(new Date(), 'dd/MM/yyyy')}
                        disabled
                      />
                      <Input
                        classNameInput="w-32"
                        name="endDate"
                        label="Splatná dne"
                        value={format(addWeeks(new Date(), 4), 'dd/MM/yyyy')}
                        disabled
                      />
                    </div>
                    <div className="mt-6 space-x-5">
                      <Button
                        className="w-32 "
                        onClick={() => {
                          resetForm()
                        }}
                        text="Vyčistiť"
                        cancel
                      />
                      <Button className="w-32" type="submit" text="Potvrdiť" submit />
                    </div>
                  </div>
                </div>
                <SubmitModal
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  handleSubmit={() => {
                    handleModalSubmit(values)
                  }}
                  title="Potvrdiť"
                  subtitle="Naozaj chcete pridať záznam?"
                />
              </form>
            )
          }}
        </Formik>
      </div>
    </>
  )
}

export default ProductForm