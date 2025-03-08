import Head from 'next/head'
import styles from '../../styles/amity.module.css'
import { useRef, useState } from 'react';
import { useRouter } from "next/router"; // Import useRouter
const Amity = () =>{
    const formRef = useRef(null); // Create a reference for the form
    const first = useRef(null) 

    const scrollToForm = () => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth" }); // Smooth scroll
            first.current.focus()
        }
    };
    const [selectedCourse, setSelectedCourse] = useState("UG");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter(); 
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phoneNumber: "",
        course: "",
        location: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loader
        const response = await fetch("/api/amity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            router.push("/thank-you"); // Redirect to Thank You Page
        } else {
            const data = await response.json();
            setMessage(data.error);
        }
    };

    return(
    <>
    <Head>
    <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Amity University Online - Online MBA, MCA, MA, M.Com, BBA, BCA, BA</title>
  <meta name="description"
    content="Take your Career to the New Heights with Online Courses at Amity University including Online MBA, MCA, MA, M.Com, BBA, BCA, BA" />
  <meta name="keywords"
    content="Online MBA, Online MBA Degree, Online MBA Program, Online MCA, Online MCA Degree, Online MCA Program, Online MCOM, Online MCOM Degree, Online BBA, Online BCA, Online MA, Online BA" />
    <link rel="icon" type="image/x-icon" href="/amity/favicon.ico" />
    <meta name="author" content='upschool'/>
    <meta property="og:url" content="" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="" />
    <meta property="og:description" content="" />
    <meta property="og:image" content="" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:domain" content="" />
    <meta property="twitter:url" content="" />
    <meta name="twitter:title" content="" />
    <meta name="twitter:description" content="" />
    <meta name="twitter:image" content="" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
    </Head>
    <header className="bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex h-10 justify-between items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <img 
                            src='/amity/logo.jpg' 
                            alt='amity logo' 
                            className={styles.logo} 
                        />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="md:flex space-x-8">
                    <div>
                        <button className={styles.buttoncontainer2}><a className={styles.linking} onClick={scrollToForm}>Pay with 0% EMI</a></button>
                    </div> 
                    <div>
                        <button className={styles.buttoncontainer}><a className={styles.linking} onClick={scrollToForm}>Limited Seats left! Apply Now!</a></button>
                    </div>  
                    </nav>
                </div>
            </div>
        </header>
    <div className={styles.main_container}>

<div className={styles.main_container_flex}>
    <div className={styles.main_data}>
        <div className={styles.main_headings}>
            <h1>Drive Your Career Growth With <br /> Amity's Online MBA!</h1>
        </div>
        <div className={styles.main_headings2}>
            <h1>Gain Expertis, Build Networks, and Lead with <br /> impact. Secure Your Spot Now!</h1>
        </div>
    </div>

<div ref={formRef} className={styles.forms}>
  <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
   <div class="bg-blue-900 text-yellow-400 text-center py-2 rounded-t-lg">
    <h1 class="text-lg font-bold">
     Apply for Online MBA
    </h1>
   </div>
   <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            <div className="flex space-x-2">
                <input className="w-1/2 p-2 border border-gray-300 rounded" placeholder="First Name" type="text" name="first_name" ref={first} value={formData.first_name} onChange={handleChange} required />
                <input className="w-1/2 p-2 border border-gray-300 rounded" placeholder="Last Name" type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
            </div>
            <input className="w-full p-2 border border-gray-300 rounded" placeholder="Email ID" type="email" name="email" value={formData.email} onChange={handleChange} required />
            <input className="w-full p-2 border border-gray-300 rounded" maxLength="10" placeholder="Mobile Number" type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
            
            <select className="w-full p-2 border border-gray-300 rounded" name="course" value={formData.course} onChange={handleChange} required>
                <option value="" disabled>Select your Course</option>
                <option value="BCA">BCA</option>
                <option value="BBA">BBA</option>
                <option value="BA">BA</option>
                <option value="MBA">MBA</option>
                <option value="MCA">MCA</option>
                <option value="BCOM">BCOM</option>
            </select>

            <input className="w-full p-2 border border-gray-300 rounded" placeholder="Location (City)" type="text" name="location" value={formData.location} onChange={handleChange} required />

            <button className="w-full bg-blue-900 text-white p-2 rounded flex justify-center items-center" type="submit" disabled={loading}>
                {loading ? <div className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></div> : "Submit"}
            </button>
        </form>
  </div>
 </div>

 </div>
    <div className='text-white' >
    <div class="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 p-4" id={styles.tenure}>
        <div class="bg-blue-900 p-7 rounded-lg flex items-center space-x-4">
            <i class="fas fa-graduation-cap text-3xl"></i>
            <div>
                <p class="text-lg font-semibold">Duration: 2 years</p>
                <p class="text-sm">Master of Business Administration (Online MBA)</p>
            </div>
        </div>
        <div class="bg-blue-900 p-7 rounded-lg flex items-center space-x-4">
            <i class="fas fa-check-square text-3xl"></i>
            <div>
                <p class="text-lg font-semibold">Eligibility</p>
                <p class="text-sm">Fresh graduates and working professionals.</p>
            </div>
        </div>
        <div class="bg-blue-900 p-7 rounded-lg flex items-center space-x-4">
            <i class="fas fa-rupee-sign text-3xl"></i>
            <div>
                <p class="text-lg font-semibold">Easy EMI Options Available</p>
                <p class="text-sm">24 Months Zero Cost EMI Rs. 8292 Interest Fee</p>
            </div>
        </div>
        </div>
    </div>
    </div>
    <div className={styles.online_degree}>
            <h1 className={styles.htext}>Online Degree <b>Programs Offered</b></h1>
            <div className={styles.center}>
                <div className={styles.buttons_course}>
                    <button 
                        className={`${styles.button_ug} ${selectedCourse === "UG" ? styles.selected : ""}`}
                        onClick={() => setSelectedCourse("UG")}
                    >
                        UG Course
                    </button>
                    <button 
                        className={`${styles.button_pg} ${selectedCourse === "PG" ? styles.selected : ""}`}
                        onClick={() => setSelectedCourse("PG")}
                    >
                        PG Course
                    </button>
                </div>
            </div>

            {selectedCourse === "UG" && (
                <div className={styles.ugcourse}>
                    <div className={styles.ugcourse_container}>
                        <img src="/amity/img1.jpeg" className={styles.ugcourse_container_img} alt="BBA" />
                        <div className={styles.ug_content}>
                            <h2 className={styles.benifits}>Online BBA</h2>
                            <h4 className={styles.eligibility}>Eligibility: 12th Pass Out</h4>
                            <div className={styles.ugtenure}>
                                <h4>Duration: 3 Years</h4>
                                <a className={styles.apply} onClick={scrollToForm}>Apply Now</a>
                            </div>
                        </div>
                    </div>
                    <div className={styles.ugcourse_container}>
                        <img src="/amity/img2.jpeg" className={styles.ugcourse_container_img} alt="BCA" />
                        <div className={styles.ug_content}>
                            <h2 className={styles.benifits}>Online BCA</h2>
                            <h4 className={styles.eligibility}>Eligibility: 12th Pass Out</h4>
                            <div className={styles.ugtenure}>
                                <h4>Duration: 3 Years</h4>
                                <a className={styles.apply} onClick={scrollToForm}>Apply Now</a>
                            </div>
                        </div>
                    </div>
                    <div className={styles.ugcourse_container}>
                        <img src="/amity/img3.jpeg" className={styles.ugcourse_container_img} alt="BA" />
                        <div className={styles.ug_content}>
                            <h2 className={styles.benifits}>Online BA</h2>
                            <h4 className={styles.eligibility}>Eligibility: 12th Pass Out</h4>
                            <div className={styles.ugtenure}>
                                <h4>Duration: 3 Years</h4>
                                <a className={styles.apply} onClick={scrollToForm}>Apply Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {selectedCourse === "PG" && (
                <div className={styles.ugcourse}>
                    <div className={styles.ugcourse_container}>
                        <img src="/amity/OnlineMA.jpg" className={styles.ugcourse_container_img} alt="MBA" />
                        <div className={styles.ug_content}>
                            <h2 className={styles.benifits}>Online MBA</h2>
                            <h4 className={styles.eligibility}>Eligibility: Graduate</h4>
                            <div className={styles.ugtenure}>
                                <h4>Duration: 2 Years</h4>
                                <a className={styles.apply} onClick={scrollToForm}>Apply Now</a>
                            </div>
                        </div>
                    </div>
                    <div className={styles.ugcourse_container}>
                        <img src="/amity/OnlineMCA.jpg" className={styles.ugcourse_container_img} alt="MCA" />
                        <div className={styles.ug_content}>
                            <h2 className={styles.benifits}>Online MCA</h2>
                            <h4 className={styles.eligibility}>Eligibility: Graduate</h4>
                            <div className={styles.ugtenure}>
                                <h4>Duration: 2 Years</h4>
                                <a className={styles.apply} onClick={scrollToForm}>Apply Now</a>
                            </div>
                        </div>
                    </div>
                    <div className={styles.ugcourse_container}>
                        <img src="/amity/OnlineMCom.jpg" className={styles.ugcourse_container_img} alt="MCom" />
                        <div className={styles.ug_content}>
                            <h2 className={styles.benifits}>Online MCOM</h2>
                            <h4 className={styles.eligibility}>Eligibility: Graduate</h4>
                            <div className={styles.ugtenure}>
                                <h4>Duration: 2 Years</h4>
                                <a className={styles.apply} onClick={scrollToForm} >Apply Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    <div className={styles.advantage}>
        <h1 className={styles.adv_name}>The Amity Advantage</h1>
        <div className={styles.adv_container}>
            <div className={styles.adv_containers}>
                <img src='/amity/call-center.png' alt='' className={styles.adv_img}/>
                <p className={styles.adv_p}>Customized Mentorship from <br/> Top Industry Professionals</p>
            </div>
            <div className={styles.adv_containers}>
                <img src='/amity/chatting.png' alt='' className={styles.adv_img}/>
                <p className={styles.adv_p}>Support from Student <br/> Relationship Managers</p>
            </div>
            <div className={styles.adv_containers}>
                <img src='/amity/reading-book.png' alt='' className={styles.adv_img}/>
                <p className={styles.adv_p}>Interactive and Immersive <br/> Learning</p>
            </div>
            <div className={styles.adv_containers}>
                <img src='/amity/team.png' alt='' className={styles.adv_img}/>
                <p className={styles.adv_p}>Access to 500+ Hiring <br/> Partners</p>
            </div>
            <div className={styles.adv_containers}>
                <img src='/amity/meeting.png' alt='' className={styles.adv_img}/>
                <p className={styles.adv_p}>Specialized Career Services <br/> and Placement Assistance</p>
            </div>
            <div className={styles.adv_containers}>
                <img src='/amity/portfolio.png' alt='' className={styles.adv_img}/>
                <p className={styles.adv_p}>Develop Your Portfolio with <br/> Hands-on Projects</p>
            </div>
        </div>
    </div>

    <div style={{backgroundColor:'whitesmoke'}}>
    <h2 className={styles.htext}>Admission <b> Process </b></h2>
    <div class={styles.process_container}>
        <div class={styles.step}>
            <div class={styles.step_number}>01</div>
            <div class={styles.step_text}>Fill the registration form and create unique login credentials (on the official website)</div>
        </div>
        <div class={styles.step}>
            <div class={styles.step_number}>02</div>
            <div class={styles.step_text}>Fill in your details (including educational qualifications) and pay the application and semester fees</div>
        </div>
        <div class={styles.step}>
            <div class={styles.step_number}>03</div>
            <div class={styles.step_text}>Upload the necessary documents</div>
        </div>
        <div class={styles.step}>
            <div class={styles.step_number}>04</div>
            <div class={styles.step_text}>Submit the application form</div>
        </div>
    </div>
    </div>


    <div className={styles.accedration}>
        <h1 className={styles.htext}>Our Accerditations <b>&Recognitions</b></h1>
        <div className={styles.carousel_container}>
        <div className={styles.carousel_track}>
            <img className={styles.cimg} src='/amity/wes.png' alt=''/>
            <img className={styles.cimg} src='/amity/WASC_Logo.jpg' alt=''/>
            <img className={styles.cimg} src='/amity/qaa.jpg' alt=''/>
            <img className={styles.cimg} src='/amity/ugc.png' alt=''/>
            <img className={styles.cimg} src='/amity/eoccs.jpg' alt=''/>
            <img className={styles.cimg} src='/amity/mba-ranking.png' alt=''/>
            <img className={styles.cimg} src='/amity/wes.png' alt=''/>
            <img className={styles.cimg} src='/amity/WASC_Logo.jpg' alt=''/>
            <img className={styles.cimg} src='/amity/qaa.jpg' alt=''/>
            <img className={styles.cimg} src='/amity/ugc.png' alt=''/>
            <img className={styles.cimg} src='/amity/eoccs.jpg' alt=''/>
            <img className={styles.cimg} src='/amity/mba-ranking.png' alt=''/>
        </div>
    </div>
    </div>


    <div className={styles.amity_online}>
        <div className={styles.amity_onlinecont}>
        <h1 className={styles.amity_online_heading}>Online Degree from <br /> <b>Amity Online University</b> </h1>
        <p className={styles.online_cont}>Amity Online provides amity plus servies that has the benefits of e-lectures, <br/> counselling from academic advisors, career assistance, etc.</p> 

            <div className={styles.benifits_cont}>
                <h1 className={styles.benifits}>Benifts of Amity Online</h1>
                <div className={styles.services}>
                    <div className={styles.subservices}>
                        <h2>Career Services and Placement <br /> Assistance</h2>
                    </div>
                    <div className={styles.subservices}>
                        <h2>Handle-on & Immersive Learning through <br /> World-class LMS</h2>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.online_img}>
            <img src="/amity/certificate.jpeg" alt=""/>
        </div>   
    </div>
    <footer>
        <div className={styles.footer}>
            <h3>© 2025 Copyright Amity University</h3>
        </div>
    </footer>

    </>
    )
}

export default Amity