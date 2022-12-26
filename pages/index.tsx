import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import Modal from '../components/Modal'

export default function Home() {
    const [isOpen, setIsOpen] = useState(false)

    const [isOpenModal2, setIsOpenModal2] = useState(false)

    return (
        <>
            <div className={styles.container}>test</div>
            <button onClick={() => setIsOpen(true)}>Click to Open Modal</button>
            <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
                This is Modal Content!
                <button onClick={() => setIsOpenModal2(true)}>
                    Click to Open Modal2
                </button>
            </Modal>

            <Modal
                handleClose={() => setIsOpenModal2(false)}
                isOpen={isOpenModal2}
            >
                This is Modal Content!222
            </Modal>
        </>
    )
}
