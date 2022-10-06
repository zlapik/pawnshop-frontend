import { FC } from 'react'
import { dateFormatFromDatabase } from '@components/globals/utils'
import { ProductTableProps } from '@components/medium/ProductTable/ProductTable.types'
import { Input } from '@components/small/Input'

const ProductTable: FC<ProductTableProps> = ({ products = [] }) => {
  return (
    <div>
      <div className="w-full justify-center flex ">
        <Input name="autocomplete" classNameInput="w-96" />
      </div>
      <div className="flex flex-row p-3 font-bold border-gray-400 rounded-t border-x border-t  mx-10 mt-10">
        <div className="w-[7%]">Smlouva</div>
        <div className="w-[7%]">Inv. číslo</div>
        <div className="w-[13%]">Zakaznik</div>
        <div className="w-[12%]">Rodní číslo</div>
        <div className="w-[14%]">Produkt</div>
        <div className="w-[7%]">Nákup</div>
        <div className="w-[7%]">Prodej</div>
        <div className="w-[13%]">Přijato</div>
        <div className="w-[13%]">Prodlouženo</div>
        <div className="w-[10%]">Splatné do</div>
      </div>
      <div className="flex flex-col divide-gray-400 divide-y border-gray-400 border  rounded-b mx-10 overflow-y-auto max-h-[700px]">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-row space-x-1 items-center w-full p-3 hover:border-black hover:bg-gray-50  hover:cursor-pointer"
          >
            <div className="w-[7%] truncate"> {product.id}</div>
            <div className="w-[7%] truncate"> {product.inventory_id}</div>
            <div className="w-[13%] truncate"> {product.customer.full_name}</div>
            <div className="w-[12%] truncate"> {product.customer.id_birth}</div>
            <div className="w-[14%] truncate "> {product.product_name}</div>
            <div className="w-[7%] truncate"> {product.buy_price}</div>
            <div className="w-[7%] truncate"> {product.sell_price}</div>
            <div className="w-[13%] truncate"> {dateFormatFromDatabase(product.date_create, 'dd/MM/yyyy HH:mm')}</div>
            <div className="w-[13%] truncate"> {dateFormatFromDatabase(product.date_extend, 'dd/MM/yyyy HH:mm')}</div>
            <div className="w-[10%] truncate"> {dateFormatFromDatabase(product.date_end, 'dd/MM/yyyy HH:mm')}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductTable
