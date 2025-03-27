import React, { useContext, useEffect } from 'react'
import bgcImage from '../assets/bgcImage6.jpeg'
import Navbar from '../components/Navbar.jsx'
import MyContext from '../context api/MyContext.jsx'
import { useNavigate } from 'react-router-dom'
import Certificate from '../components/Certificate.jsx'
import axios from 'axios'






const StudentCertificatePage = () => {



    let { certificateData,
        setCertificateData,
        currentRenderedPage,
        setCurrentRenderedPage,
        setMainRole
    } = useContext(MyContext)







    useEffect(() => {
        setMainRole("student")
        setCurrentRenderedPage("StudentCertificatePage")
    }, [])








    useEffect(() => {
        try {

            async function getCertificates() {

                let response = await axios.post(import.meta.env.VITE_backend_base_Url + "/api/v1/StudentRoutes/getLoggedInUserCertificate", { id: "7787" }, { withCredentials: true })

                if (response.data) {
                    console.log(response.data)
                    if (response.data.status == "success") {
                        console.log(response.data.certificates)
                        setCertificateData(response.data.certificates)
                    }
                }

            }


            getCertificates()


        } catch (error) {
            console.log("Error from trycatch of useeffect in studentcertificate page frontend")
        }




    }, [])



























    return (
        <div className='min-h-80vh w-full overflow-x-hidden p-10 pt-40'>





            {/* navbar for this page */}
            <Navbar />









            {/* backgournd  image */}
            <img
                className='h-full w-full fixed top-0 left-0 z-[-999] object-cover '
                src={bgcImage} alt="" />






            {

                certificateData.length == 0
                    ?

                    <h2 className=' custom_glassy_effect     h-max p-5 rounded-md  text-2xl text-zinc-800'>
                        No Quiz Certificates are gained yet
                    </h2>

                    :

                    certificateData.map((eachCertificateData, index) => {
                        return (
                            <div className="" key={index}>
                                <Certificate certificateData={eachCertificateData} />
                            </div>
                        )
                    })
            }


        </div>
    )
}







export default StudentCertificatePage