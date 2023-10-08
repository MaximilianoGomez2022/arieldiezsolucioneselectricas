import { useState, useEffect } from "react"
import *as TrabajosServices from '../services/trabajos.services.js'
import emailjs from '@emailjs/browser';
import React, { useRef } from 'react';
import { Link } from "react-router-dom";

function HomePage(){

  const [trabajos, setTrabajos] = useState([])

  useEffect(()=>{
      TrabajosServices.find()
      .then(data => {
          setTrabajos(data)
          console.log(data)
      })
  }, [])

  //Email
  let [nombre, setNombre] = useState('')
  let [mail, setMail] = useState('')
  let [asunto, setAsunto] = useState('')
  let [mensaje, setMensaje] = useState('')
  let [error, setError] = useState([])
  let form = useRef();

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

  function OnChangeAsunto(event){
      setAsunto(event.target.value)
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
                <img src="../assets/banner-1920.jpg" alt="banner de bienvenida al sitio"/>
            </picture>
          </figure>
        </section>
        <section id="servicios">
          <h2>NUESTROS SERVICIOS</h2>
          <div className="contenedor-servicios">
          <div className="item" data-aos="fade-up">
          <img src="../assets/pastilla-1.svg" alt=""/>
          <h3>INSTALACIONES<br/>DOMICILIARIAS</h3>
          <p>jwoeghskdj dshjisdghiohdsg hiosdhgoihdsg ihodsdihgoh</p>
          </div>
          <div className="item" data-aos="fade-up">
              <img src="../assets/pastilla-2.svg" alt=""/>
              <h3>MONTAJES<br/>GENERAL</h3>
              <p>jwoeghskdj dshjisdghiohdsg hiosdhgoihdsg ihodsdihgoh</p>
          </div>
          <div className="item" data-aos="fade-up">
              <img src="../assets/pastilla-3.svg" alt=""/>
              <h3>ILUMINACIÓN<br/>EXTERIOR E INTERIOR</h3>
              <p>jwoeghskdj dshjisdghiohdsg hiosdhgoihdsg ihodsdihgoh</p>
          </div>
          <div className="item" data-aos="fade-up">
              <img src="../assets/pastilla-4.svg" alt=""/>
              <h3>AUTOMATICOS<br/>DE TANQUE</h3>
              <p>jwoeghskdj dshjisdghiohdsg hiosdhgoihdsg ihodsdihgoh</p>
          </div>
          </div>
        </section>
        <section id="trabajos">
          <h2>TRABAJOS REALIZADOS</h2>
          <div className="contenedor-trabajos">
          {trabajos.map(({_id, portada}) =>
          <article key={_id} className="contenedor-trabajos">
            <Link to={`/trabajos/${_id}`}>
                <img src={`../assets/${portada}`}></img>
            </Link>
          </article> )}
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
          <form ref={form} onSubmit={onSubmit}>
            <div id='success-envio' className='success-envio-oculto'>
            El mensaje se envió correctamente
            </div>
            <div id='error-envio' className='error-envio-oculto'>
            No se pudo enviar el mensaje. Hay errores en los campos ingresados, por favor revisalos. 
            </div>
            <div className="form-labels">
                <div>
                    <label htmlFor="from_name">Nombre</label>
                    <input type="text" name="from_name" id="from_name" placeholder="Nombre" onChange={OnChangeNombre} value={nombre}/>
                    <div id="error-nombre"></div>
                </div>
                <div>
                    <label htmlFor="Asunto">Asunto</label>
                    <input type="text" name="Asunto" id="Asunto" placeholder="Asunto" onChange={OnChangeAsunto} value={asunto}/>
                    <div id="error-asunto"></div>
                </div>
            </div>
            <div className="form-labels">
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Email" onChange={OnChangeMail} value={mail}/>
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
                <img src="../assets/separador-redes-1920.png" alt="separador"/>
            </picture>
          </figure>
        </div>
        <section id="redes">
            <h2>NUESTRAS REDES</h2>
            <div className="contenedor-redes">  
            <div className="item" data-aos="fade-up">
            <a><img src="../assets/redes-17.svg" alt="icono de facebook"/></a>
            </div>
            <div className="item" data-aos="fade-up">
                <img src="../assets/redes-18.svg" alt="icono de whatsapp"/>
            </div>
            <div className="item" data-aos="fade-up">
                <img src="../assets/redes-19.svg" alt="icono de gmail"/>
            </div>
            <div className="item" data-aos="fade-up">
                <img src="../assets/redes-20.svg" alt="icono de instagram"/>
            </div>
            </div>
        </section>
        </main>
          )}

export default HomePage