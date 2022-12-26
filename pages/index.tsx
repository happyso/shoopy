import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import Modal from '../components/Modal'

export default function Home() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <div className={styles.container}>test</div>
            <button onClick={() => setIsOpen(true)}>Click to Open Modal</button>
            <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
                This is Modal Content!
            </Modal>
        </>
    )
}
