import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import angel from './assets/angel.jpg'
import diego from './assets/diego.jpg'
import jose from './assets/jose.jpg'


// Configuración de tu proyecto Supabase
const supabaseUrl = "https://yuahbeebbgtyartjdrtd.supabase.co"
const supabaseKey = "sb_publishable_1WsjoRBthgvQxSseE7xYzg_c56NvpDW"
const supabase = createClient(supabaseUrl, supabaseKey)

function App() {
  const [resultado, setResultado] = useState(null)

  const obtenerMaximo = async () => {
    const { data, error } = await supabase
      .from("esp32_hernan_1")
      .select("id, valor, created_at")
      .order("valor", { ascending: false })
      .limit(1)

    if (error) {
      console.error("Error al consultar:", error)
    } else if (data && data.length > 0) {
      const fila = data[0]
      // convertir a hora local detectada por el navegador
      const fechaLocal = new Date(fila.created_at).toLocaleString("es-AR", {
        timeZone: "America/Argentina/Buenos_Aires",
      })
      setResultado({ ...fila, fechaLocal })
    }
  }



    const obtenerMinimo = async () => {
    const { data, error } = await supabase
      .from("esp32_hernan_1")
      .select("id, valor, created_at")
      .order("valor", { ascending: true })
      .limit(1)

    if (error) {
      console.error("Error al consultar:", error)
    } else if (data && data.length > 0) {
      const fila = data[0]
      // convertir a hora local detectada por el navegador
      const fechaLocal = new Date(fila.created_at).toLocaleString("es-AR", {
        timeZone: "America/Argentina/Buenos_Aires",
      })
      setResultado({ ...fila, fechaLocal })
    }
  }



  return (
    <div style={{ padding: "20px" }}>
      <h1>Consulta Máximo Supabase</h1>
      <button onClick={obtenerMaximo}>Obtener máximo</button>


      <button onClick={obtenerMinimo}>Obtener minimo</button>
      {resultado && (
        <p>
          ID: {resultado.id} <br />
          Valor: {resultado.valor} <br />
          Fecha local: {resultado.fechaLocal}
        </p>
      )}

      <p>Hecho por Hernán Costantini</p>
      <div style={{ display: 'flex', gap: '20px' }}>

        <div>       
          <img src={angel} alt="Peugeot Logo" style={{ display: 'flex', width: '150px' , gap : '0px'}} />
          <p style={ {gap : '0px'} }>Responsable Ingenieria</p> 
        </div>

        <div>
          <img src={diego} alt="Peugeot Logo" style={{ width: '120px' }} /> 
          <p>Responsable Mantenimiento</p> 
        </div>

          <div>
          <img src={jose} alt="Peugeot Logo" style={{ width: '140px' }} /> 
          <p>Responsable Produccion</p> 
        </div>

        
        
      </div>

    </div>
  )
}

export default App
