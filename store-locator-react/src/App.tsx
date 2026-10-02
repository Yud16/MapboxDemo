import { useRef, useEffect, useState} from 'react'
import mapboxgl from 'mapbox-gl'
import Marker from './Marker'
import Sidebar from './Sidebar'
import { storeLocations } from './assets/locations'
import type { StoreFeature } from './assets/locations'

import 'mapbox-gl/dist/mapbox-gl.css'
import './App.css'

function App() {
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [stores] = useState<StoreFeature[]>(storeLocations)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [selectedStore, setSelectedStore] = useState<StoreFeature | null>(null)

  useEffect(() => {
    // Set your Mapbox access token
    mapRef.current = new mapboxgl.Map({
      accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
      container: mapContainerRef.current!, 
      center: [-77.03915, 38.90025], // Washington DC
      zoom: 12.5,
      config: {
        basemap: { theme: 'faded'}
      }
    })

    mapRef.current.on('load', ()=> {
      setMapLoaded(true)
    })

    return () => {
      mapRef.current?.remove()
    }
  }, [])

  useEffect(() => {
    if (!selectedStore) return
    mapRef.current!.flyTo({center: [selectedStore.geometry.coordinates[0], selectedStore.geometry.coordinates[1]], zoom: 13, duration: 1000})
  }),[selectedStore]

  return (
    <div className="flex absolute top-0 left-0 right-0 bottom-0 h-full w-full">
      <Sidebar 
      stores={stores}
      setSelectedStore={setSelectedStore}
            selectedStore={selectedStore}
            />
      
      <div className="w-3/4">
        <div className="h-full w-full" ref={mapContainerRef} />
        {mapLoaded && stores.map(location => (
          <Marker
            key={location.properties.name}
            feature={location}
            map={mapRef.current!}
            setSelectedStore={setSelectedStore}
            selectedStore={selectedStore}
          />
        ))}
      </div>
    </div>
  )
}

export default App