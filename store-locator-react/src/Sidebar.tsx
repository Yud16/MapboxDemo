import type { StoreFeature } from './assets/locations'

interface SidebarProps {
  stores: StoreFeature[]
}

const Sidebar = ({ stores  }: SidebarProps) => {

  return (
    <div className="w-1/4 p-4 overflow-y-auto bg-sg-light-green shadow-xl z-10">
      <h2 className="text-sg-green text-xl font-bold mb-4">
        Stores nearby: {stores.length}
      </h2>
      
      {stores.map((store) => {
        return (
          <div 
            key={store.properties.name} 
            className={'bg-transparent hover:bg-white/50 relative flex flex-col my-4 border border-sg-green rounded-lg transition-all duration-200 cursor-pointer p-4'}>
               
            <h4 className="mb-2 text-sg-green text-xl font-semibold">{store.properties.name}</h4>
            <div className="text-sg-green leading-normal font-light">
                <div>
                    <span className="font-bold text-sm">Address: </span>{store.properties.address}
                </div>    
                <div>
                    <span className="font-bold text-sm">Phone: </span>{store.properties.phoneFormatted}
                </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Sidebar