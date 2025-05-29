import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import PostsSection from '../components/PostsSection'
import Footer from '../components/Footer'

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <>
            <NavBar onSearch={setSearchTerm}/>
            <PostsSection searchTerm={searchTerm}/>
            <Footer />
        </>
    )
}
