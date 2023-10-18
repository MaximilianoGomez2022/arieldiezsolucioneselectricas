import { useState, useEffect } from "react"
import *as TrabajosServices from '../services/trabajos.services.js'
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Modal from '../src/components/modal.jsx'

function HomePage(){

  const [trabajos, setTrabajos] = useState([])
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setModalOpen(true);
    console.log('abrio', imageSrc)
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(()=>{
      TrabajosServices.find()
      .then(data => {
          setTrabajos(data)
          console.log(data)
      })
  }, [])

  //Email

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_d21inq5', 'template_j3jwudj', form.current, '_f0sHcwqX9xxEzUtD')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  let [nombre, setNombre] = useState('')
  let [mail, setMail] = useState('')
  let [mensaje, setMensaje] = useState('')
  let [error, setError] = useState([])

  function onSubmit(event){
      event.preventDefault()
      let errNom = document.querySelector('#error-nombre')
      let errMail = document.querySelector('#error-mail')
      let errMens = document.querySelector('#error-mensaje')



      if(nombre !== '' && mensaje !== '' && mail !== '') {
          emailjs.sendForm('service_gvufsvh', 'template_wv3356c', form.current, 'ZPbvjNyvJzGq33SIL')
          .then((result) => {
              console.log(result.text);
              console.log('Se envió el mensaje')
              let envioError = document.querySelector('#error-envio')
              envioError.className = 'error-envio-oculto'
              let envio = document.querySelector('#success-envio')
              envio.className = 'success-envio-mostrar'
              setTimeout(() => {
                 envio.className = 'success-envio-oculto' 
              }, 10000);
          }, (error) => {
              console.log(error.text);
          })
      }
      
      if (nombre === '') {
          console.log('Debés Ingresar el nombre')
          errNom.innerHTML = 'Debés Ingresar el nombre'
          errMens.innerHTML = 'Debés Ingresar el mensaje'
          let envio = document.querySelector('#error-envio')
          envio.className = 'error-envio-mostrar'
      } else {
          errNom.innerHTML= ''
      }
      
      if (mensaje === '') {
          console.log('Debés Ingresar el mensaje')
          errMens.innerHTML = 'Debés Ingresar el mensaje'
          let envio = document.querySelector('#error-envio')
          envio.className = 'error-envio-mostrar'
      }  else {
          errMens.innerHTML= ''
      }
      
      if (mail === '') {
          console.log('Debés Ingresar el mail')
          errMail.innerHTML = 'Debés Ingresar un mail válido'
          errMens.innerHTML = 'Debés Ingresar el mensaje'
          let envio = document.querySelector('#error-envio')
          envio.className = 'error-envio-mostrar'                                        
      }   else {
          errMail.innerHTML= ''
      }

  }

  function OnChangeNombre(event){
      setNombre(event.target.value)
  }

  function OnChangeMail(event){
      setMail(event.target.value)
  }

  function OnChangeMensaje(event){
      setMensaje(event.target.value)
  }

   return (
        <main>
        <section className="banner">
        <div className="texto-banner">
        <h1>ARIEL DIEZ</h1>
        <p>SOLUCIONES ELECTRICAS</p>
        </div>
          <figure>                  
            <picture >
                <source media="(max-width: 378px)" srcSet="../assets/banner-378.jpg"/>
                <source media="(max-width: 576px)" srcSet="../assets/banner-576.jpg"/>
                <source media="(max-width: 768px)" srcSet="../assets/banner-768.jpg"/>
                <source media="(max-width: 991px)" srcSet="../assets/banner-991.jpg"/>
                <img src="../assets/banner-1920.jpg" alt="imgs/banner de portada iagen de un tablero de un auto"/>
            </picture>
          </figure>
        </section>
        <section id="servicios">
          <h2>NUESTROS SERVICIOS</h2>
          <div className="contenedor-servicios">
          <div className="item" data-aos="fade-up">
          <img src="../assets/pastilla-1.svg" alt=""/>
          <h3>INSTALACIONES<br/>DOMICILIARIAS</h3>
          <p>Canalizaciones<br/>Cableados, re cableado, instalación de jabalina (puesta a tierra).</p>
          </div>
          <div className="item" data-aos="fade-up">
              <img src="../assets/pastilla-2.svg" alt=""/>
              <h3>MONTAJES<br/>GENERAL</h3>
              <p>Bandejas portacables, gabinetes, todo tipo de luminarias públicas, galponeras, etc.</p>
          </div>
          <div className="item" data-aos="fade-up">
              <img src="../assets/pastilla-3.svg" alt=""/>
              <h3>ILUMINACIÓN<br/>EXTERIOR E INTERIOR</h3>
              <p>Farolas de jardín, iluminación de piletas, artefactos embutidos en interior, proyector, reflector, etc.</p>
          </div>
          <div className="item" data-aos="fade-up">
              <img src="../assets/pastilla-4.svg" alt=""/>
              <h3>AUTOMATICOS<br/>DE TANQUE</h3>
              <p>Tablero de comando manual automático, cableado y colocación de boya nivel de agua, etc.</p>
          </div>
          </div>
        </section>
        <section id="trabajos">
          <h2>TRABAJOS REALIZADOS</h2>
          <div className="contenedor-trabajos">
          {trabajos.map(({_id, nombre, portada}) =>
          <article key={_id}>
                <img className="imagenes-trabajos" src={`../assets/${portada}`}
                onClick={() => handleImageClick(portada)}></img>
          </article> )}
          </div>
        </section>
        <section id="videos">
            <h2>VIDEOS</h2>
            <div className="contenedor-videos">
            <div>
            <video controls>
                <source src="../assets/video-1.mp4" type="video/mp4"/>
            </video>
            </div> 
            <div>
            <video controls>
                <source src="../assets/video-2.mp4" type="video/mp4"/>
            </video>
            </div>
            <div>  
            <video controls>
                <source src="../assets/video-3.mp4" type="video/mp4"/>
            </video>
            </div>
            <div>
            <video controls>
                <source src="../assets/video-4.mp4" type="video/mp4"/>
            </video>
            </div>
            </div>
        </section>
        <div id="separador">
        <figure>                  
            <picture >
                <source media="(max-width: 378px)" srcSet="../assets/separador-cel.png"/>
                <source media="(max-width: 576px)" srcSet="../assets/separador-576.png"/>
                <source media="(max-width: 768px)" srcSet="../assets/separador-768.png"/>
                <source media="(max-width: 991px)" srcSet="../assets/separador-991.png"/>
                <img src="../assets/separador-1920.png" alt="imgs/banner de portada iagen de un tablero de un auto"/>
            </picture>
          </figure>
        </div>
        <section id="contacto">
          <h2>CONTACTO</h2>
          <form ref={form} onSubmit={sendEmail}>
            <div id='success-envio' className='success-envio-oculto'>
            El mensaje se envió correctamente
            </div>
            <div id='error-envio' className='error-envio-oculto'>
            No se pudo enviar el mensaje. Hay errores en los campos ingresados, por favor revisalos. 
            </div>
            <div className="form-labels">
                <div>
                    <label htmlFor="user_name">Nombre</label>
                    <input type="text" name="user_name" id="user_name" placeholder="Nombre" onChange={OnChangeNombre} value={nombre}/>
                    <div id="error-nombre"></div>
                </div>
            </div>
            <div className="form-labels">
                <div>
                    <label htmlFor="user_email">Email</label>
                    <input type="email" name="user_email" id="user_email" placeholder="Email" onChange={OnChangeMail} value={mail}/>
                    <div id="error-mail"></div>
                </div>
            </div>
            <div>
                <label htmlFor="message">Mensaje</label>
                <textarea name="message" id="message" cols="30" rows="10" placeholder="Mensaje" onChange={OnChangeMensaje} value={mensaje}></textarea>
                <div id="error-mensaje"></div>
            </div>
            <input type="submit" value="Enviar"/>
        </form>
        </section>
        <div id="separador-redes">
        <figure>                  
            <picture >
                <source media="(max-width: 378px)" srcSet="../assets/separador-cel-redes.png"/>
                <source media="(max-width: 576px)" srcSet="../assets/separador-redes-576.png"/>
                <source media="(max-width: 768px)" srcSet="../assets/separador-redes-768.png"/>
                <source media="(max-width: 991px)" srcSet="../assets/separador-redes-991.png"/>
                <img src="../assets/separador-redes-1920.png" alt="imgs/banner de portada iagen de un tablero de un auto"/>
            </picture>
          </figure>
        </div>
        <section id="redes">
            <h2>NUESTRAS REDES</h2>
            <div className="contenedor-redes">  
            <div className="item" data-aos="fade-up">
            <a><img src="../assets/redes-17.svg" alt=""/></a>
            </div>
            <div className="item" data-aos="fade-up">
                <a href="https://api.whatsapp.com/send?phone=541169993384" target="_blank"><img src="../assets/redes-18.svg" alt="logo de whatsapp"/></a>
            </div>
            <div className="item" data-aos="fade-up">
                <a href="mailto:a.d.solucioneselectricas.2023@gmail.com"><img src="../assets/redes-19.svg" alt=""/></a>
            </div>
            <div className="item" data-aos="fade-up">
                <a href="https://www.instagram.com/a.d.solucioneselectricas/" target="_blank"><img src="../assets/redes-20.svg" alt=""/></a>
            </div>
            </div>
            <div className="logo-wsp">
            <a href="https://api.whatsapp.com/send?phone=541169993384" target="_blank">
                <img src="../assets/wspp.png" alt="logo de WhatsApp"/>
            </a>
            </div>
        </section>
        <Modal isOpen={isModalOpen} imageSrc={selectedImage} onClose={handleCloseModal} />
        </main>
          )}

export default HomePage