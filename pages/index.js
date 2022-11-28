import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react'
import { client } from '../lib/client'
import { Product, HeroBanner, FooterBanner } from '../components'

const Home = ({ products, bannerData }) => (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
      {console.log(bannerData)}
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Mugs of many Variations</p>
      </div>

      <div className='products-container'>
        {products?.map((product) => product.name)}
      </div>

      <FooterBanner />
    </>
)

export const getServerSideProps = async () => {
  //fetch products from sanity
  const query = '*[_type == "product"]'
  const products = await client.fetch(query)

  //fetch banner info from sanity
  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  return {
    props: { products, bannerData }
  }
}

export default Home
