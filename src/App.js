import { useEffect, useState } from "react";
import React from "react";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import './App.css'
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState (null);
  const [blackHeader, setBlackHeader] = useState(false) 

  useEffect(()=>{
    const loadAll = async () => {
      //Pegando a lista total//
      let list = await Tmdb.getHomeList();
      setMovieList(list)

      //Pegar filme em destaque
      let originals = list.filter(i=>i.slug === 'originals')
      let randomChosen = Math.floor(Math.random()*(originals[0].items.results.length-1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo)
      
    }

    loadAll();
  },[])

  useEffect(()=>{
    const scrollListener = () =>{
      if(window.scrollY > 10){
        setBlackHeader(true)
        }else{
          setBlackHeader(false)
      }
    }
    window.addEventListener('scroll',scrollListener)

    return() =>{
      window.removeEventListener('scroll',scrollListener)
    }
  },[])

  return (
    <div className="page">

      <Header black={blackHeader} />

      {featuredData &&
          <FeaturedMovie item={featuredData} />
      }

        <section className="lists"> 
          {movieList.map((item,key)=>(
            <MovieRow key={key} title={item.title} items={item.items} />
          ))}
        </section>
        <footer>
          Aula do Professor Bonieky (B7Web) <br/>
          Aluno: João Marcos Monteiro <br/>
          Todos os direitos de imagem: Netflix <br/>
          Dados retirados do site themoviedb.org
        </footer>
        {movieList.length <= 0 &&
        <div className="loading" alt="carregando">
            <img src="https://hips.hearstapps.com/pop.h-cdn.co/assets/16/48/1480516731-4f155204-7266-486d-88a5-2018ff11f947.gif?resize=400:*" />
        </div>
        }
    </div>
  )
}