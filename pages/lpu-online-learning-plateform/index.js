import Head from 'next/head';
import styles from '../../styles/lpu.module.css';
import styled from '../../styles/manipal.module.css'
import { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import { useRouter } from "next/router"; // Import useRouter 
const OwlCarousel = dynamic(() => import("react-owl-carousel"), { ssr: false });

const Lpu = () =>{
  const [activeTab, setActiveTab] = useState("UG");
    useEffect(() => {
            // Dynamically add Bootstrap CSS after Tailwind
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
            document.head.appendChild(link);
        
            return () => {
              // Remove Bootstrap CSS when leaving the page
              document.head.removeChild(link);
            };
          }, []);

          const options = {
            loop: true,
            margin: 20,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 3000,
            responsive: {
              0: { items: 1 },
              600: { items: 2 },
              1000: { items: 3 },
            },
          };
        
          const approvals = [
            {
              img: "/lpu/nirf-lpu.png",
              title: "NIRF 47th Ranked",
              desc: "47th in the NIRF ranking is a significant achievement, indicating that the university is among the top 50 institutions in the country.",
            },
            {
              img: "/lpu/ugc-lpu.png",
              title: "UGC Entitled",
              desc: "UGC is a government body promoting higher education. Every university must undergo an inspection by an expert panel designated by UGC.",
            },
            {
              img: "/lpu/AICTE-lpu.png",
              title: "AICTE Accredited",
              desc: "AICTE accreditation ensures that an educational institution meets quality and standards for technical education programs.",
            },
            {
              img: "/lpu/outlook-lpu.png",
              title: "Outlook",
              desc: "Outlook India is a respected weekly news magazine covering topics like politics, society, culture, sports, and education.",
            },
            {
              img: "/lpu/qs-lpu.png",
              title: "QS World University Ranking",
              desc: "The QS World University Ranking lists the top universities worldwide, compiled by Quacquarelli Symonds (QS).",
            },
          ];

          const [loading, setLoading] = useState(false);
         const router = useRouter(); 
         const [formData, setFormData] = useState({
             name: "",
             email: "",
             phoneNumber: "",
             course:"",
             location: ""
         });
    
         const [message, setMessage] = useState("");
    
         const handleChange = (e) => {
             setFormData({ ...formData, [e.target.name]: e.target.value });
         };
    
         const handleSubmit = async (e) => {
             e.preventDefault();
             setLoading(true); // Show loader
             const response = await fetch("/api/lpu", {
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
 <meta name="facebook-domain-verification" content="0t0vd7zenf0jlzn3ulr9qa5nq9tf9k" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>LPU Online | Lovely Professional University | Distance Education</title>   
    <meta name="description" content="Lovely Professional University - LPU Online offers a wide range of distance education programs for BA, BCA, BCom, MBA, MCA, MCom & MSc in 2023." />
    <link rel="icon" type="image/x-icon" href="./lpu/lpu-fav" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.green.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/css/intlTelInput.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/intlTelInput.min.js"></script>
 </Head>  

<div style={{overflow:"hidden"}}>
<div className={styles.navigation}>
    <div>
      <a href="">
        <img
          src="/lpu/cropped-download-1.png"
          alt="LOGO"
          className={styles.logo}
        />
      </a>
    </div> 
    <div>
          <button className={styles.buttons_form} onClick={() => {
                const fnameInput = document.getElementById("name");
                
                if (fnameInput) {
                  fnameInput.scrollIntoView({ behavior: "smooth", block: "start" });
                  fnameInput.focus(); // Instant focus without delay
                }
              }}
          >Admission closing soon! Enroll Now!</button>
    </div>
  </div>
 </div>  

{/*  startslider */}
<div id={styles.desk_sl}>
        <OwlCarousel
          className={styles.owl_carousel}
          loop
          margin={10}
          items={1}
          autoplay
          autoplayTimeout={4000}
          animateOut="fadeOut"
          dots={false}
          nav={false} 
        >
          {["/lpu/img1.png", "/lpu/img2.png", "/lpu/img3.png"].map((src, index) => (
            <div key={index} className={styles.slide}>
              <img src={src} width="100%" alt={`LPU Banner ${index + 1}`} />
            </div>
          ))}
        </OwlCarousel>
      </div>

  {/*  endslider */}
  <div className={styles.org_ad}>
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <p className={styles.org_p} style={{marginTop:"10px"}}>
            Seats are filling fast! There&rsquo;s only limited seats available.
          </p>
        </div>
        <div className="col-md-4">
            {" "}
            <center>
              <button type="button" className={styles.btn2}
              onClick={() => {
                const fnameInput = document.getElementById("name");
                
                if (fnameInput) {
                  fnameInput.scrollIntoView({ behavior: "smooth", block: "start" });
                  fnameInput.focus(); // Instant focus without delay
                }
              }}>
                Apply Now
              </button>
            </center>
        </div>
      </div>
      {/*end of row*/}
    </div>
    {/*end of container*/}
  </div>
  <section id={styles.facility}>
    <div className="container">
      <div className="row">
        <div className="col-md-6" id={styles.box}>
          <div className={styles.box_left}>
            <div className={styles.b1}>
              <p>
                <i className="fa fa-play-circle" /> Flexibility
              </p>
              <h6 className={styles.lec} style={{marginRight:"10px"}}>Live + Recorded</h6>
              <p className="box_t">
                A live lecture experience that is interactive and innovative
              </p>
            </div>
            <div className={styles.b1}>
              <p>
                <i className="fa fa-laptop" style={{marginRight:"10px"}} />
                Support
              </p>
              <h6 className={styles.lec}>Placement Support</h6>
              <p className="box_t">
                Placement assistance including CV workshops &amp; mock
                interviews
              </p>
            </div>
            <div className={styles.b1}>
              <p>
                <i className="fa fa-clock-o" style={{marginRight:"10px"}} /> Opportunities
              </p>
              <h6 className={styles.lec}>Professional Development</h6>
              <p className="box_t">
                Industry Knowledge and 360° Professional Development
              </p>
            </div>
          </div>
          {/*end of box1*/}
          <div className={styles.box_right}>
          <div className={styles.b1}>
              <p>
                <i className="fa fa-hourglass-half" style={{marginRight:"10px"}}/> Commitment
              </p>
              <h6 className={styles.lec}>8/10 Hourse Week</h6>
              <p className="box_t">Recommended hours for the programmes</p>
            </div>
              <div className={styles.b1}>
              {" "}
              <p>
                <i className="fa fa-calendar" style={{marginRight:"10px"}}/> Application Deadline with EDB
              </p>
              <h6 className={styles.lec}>Early Decision Benefits</h6>
              <p className="box_t">
                Limited Seats Available to avail Early Decision Benefit
              </p>
            </div>
              <div className={styles.b1}>
              {" "}
              <p>
                <i className="fa fa-book" style={{marginRight:"10px"}} /> Examination
              </p>
              <h6 className={styles.lec}>Online Exam</h6>
              <p className="box_t">
                Live monitoring of online proctored exams through Artificial
                Intelligence
              </p>
            </div>
          </div>
          {/*end of box1*/}
        </div>
        <div className="col-md-1" />
        <div className="col-md-5 col-sm-12">
          <div id={`${styles.form_ftr} form-ftr`}>
            <h3 className={styles.frm_heading}>Free Counseling</h3>
            <center>
              <p>Have Doubt? Talk FREE to Our Expert</p>
            </center>
            <hr />
            <form
              method="post"
              name="form"
              id="enquiry-form"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                id="full_name"
                placeholder="Enter Your Name"
                className="form-control"
                required
                value={formData.name}
                onChange={handleChange}
              />  <br />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />  <br />
              <input
                type="tel"
                id="phone"
                name="phoneNumber"
                className="form-control"
                placeholder="Enter your phone number"
                required
                maxLength="10"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <br />
              <select
                name="course"
                className="form-control"
                id="course"
                required
                value={formData.course}
                onChange={handleChange}
              >
                <option value="" hidden="">
                  Select Your Course
                </option>
                <option value="BA">BA</option>
                <option value="BCOM">B.COM</option>
                <option value="BCA">BCA</option>
                <option value="MBA">MBA</option>
                <option value="MA">MA</option>
                <option value="MCOM">M.COM</option>
                <option value="MSC">MSC</option>
                <option value="MCA">MCA</option>
              </select>
              <br />
              <select
                name="location"
                className="form-control"
                id="location"
                required
                value={formData.location}
                onChange={handleChange}
              >
                <option value="" hidden="">
                  Select Your State
                </option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar </option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Delhi">Delhi</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat </option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand </option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh </option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya </option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha </option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim </option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura </option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand </option>
                <option value="West Bengal">West Bengal </option>
              </select>
              <input
                type="hidden"
                name="source"
                id="source"
                placeholder="Enter your source"
                className="form-control"
                defaultValue="LPU"
                required=""
              />
              <br />
              <input
                type="hidden"
                name="sub_source"
                id="sub_source"
                className="form-control"
                defaultValue=""
              />
              <input
                type="hidden"
                name="utm_source"
                id="utm_source"
                className="form-control"
                defaultValue=""
              />
              <input
                type="hidden"
                name="utm_medium"
                id="utm_medium"
                className="form-control"
                defaultValue=""
              />
              <input
                type="hidden"
                name="utm_term"
                id="utm_term"
                className="form-control"
                defaultValue=""
              />
              <center>
              <button
                  type="submit"
                  name="submit"
                  className={styles.sub_btn}
                  disabled={loading} // Disable while loading
                >               
                  {loading ? (
                    <div className={styles.loader}></div> // Show loader when loading is true
                  ) : (
                    "Submit"
                  )}
              </button>

              </center>
            </form>
          </div>
        </div>
        {/*end of col*/}
      </div>
      {/*end of row*/}
      <br />
      <hr />
    </div>
    {/*end of container*/}
  </section>
  <section id="advantage">
    <div className="container">
      <div className="row"  >
        <div className="col-md-3 pr-1">
          <h2 className={styles.adv_h}>
            4 Reason
            <br /> To Pursue Online MBA <br />
            <span classname={styles.sp} style={{color: "#FF6600"}}>From LPU</span>
          </h2>
        </div>
      </div>
      {/*end of row*/}
    </div>
    {/*end of container*/}
  </section>

  <section className={styled.onlyonphone} style={{overflow:'hidden'}}>
  <div className={`${styled.containerfluid}`} >
            <div className="row" >
              <div className="col-lg-12">
                <div className={styled.horizontal_timeline}>
                  <ul className={`list-inline ${styled.items}`}>
                    <li className={`list-inline-item ${styled.items_list}`}>
                      <div className="px-4">
                        <div
                          className={`${styled.event_date} badge bg-info  text-white`}
                          style={{
                            backgroundColor: "#FF6600",
                            fontSize: 16,
                            padding: 6
                          }}
                        >
                          1
                        </div>
                        <h5
                          className="pt-2"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: 600
                          }}
                        >
                         A top-notch curriculum & Exceptional faculty
                        </h5>
                        <p
                          className="text-muted"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: 16,
                            color: "#000"
                          }}
                        >
                         An industry-oriented curriculum, designed by academic experts and industry leaders, is taught by highly experienced professors, ensuring practical knowledge.
                        </p>
                      </div>
                    </li>
                    <li className={`list-inline-item ${styled.items_list}`}>
                      <div className="px-4">
                        <div
                          className={`${styled.event_date} badge bg-info text-white`}
                          style={{
                            backgroundColor: "#FF6600",
                            fontSize: 16,
                            padding: 6
                          }}
                        >
                          2
                        </div>
                        <h5
                          className="pt-2"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: 600
                          }}
                        >
                         An interactive learning management system (LMS)
                        </h5>
                        <p
                          className="text-muted"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: 16,
                            color: "#000"
                          }}
                        >
                       The best interactive LMS should offer personalized learning paths for students. This can allow students to learn in a way that is best suited to their learning style.
                        </p>
                      </div>
                    </li>
                    <li className={`list-inline-item ${styled.items_list}`}>
                      <div className="px-4">
                        <div
                          className={`${styled.event_date} badge bg-info  text-white`}
                          style={{
                            backgroundColor: "#FF6600",
                            fontSize: 16,
                            padding: 6
                          }}
                        >
                          3
                        </div>
                        <h5
                          className="pt-2"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: 600
                          }}
                        >
                        Support for placements and other career goals
                        </h5>
                        <p
                          className="text-muted"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: 16,
                            color: "#000"
                          }}
                        >
                      Strong support for placements and career goals can provide students with access to job opportunities, internships, and other resources that can help them launch their careers.
                        </p>
                      </div>
                    </li>
                    <li className={`list-inline-item ${styled.items_list}`}>
                      <div className="px-4">
                        <div
                           className={`${styled.event_date} badge bg-info  text-white`}
                          style={{
                            backgroundColor: "#FF6600",
                            fontSize: 16,
                            padding: 6
                          }}
                        >
                           4
                        </div>
                        <h5
                          className="pt-2"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: 600
                          }}
                        >
                      A mentoring program for personalized learning
                        </h5>
                        <p
                          className="text-muted"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: 16,
                            color: "#000"
                          }}
                        >
                       Mentorship provides students with valuable career guidance and advice based on their own experiences in the industry to succeed in a student&rsquo;s chosen field.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
</section>
<section className={`${styled.notmobb}${styles.cont}`} style={{overflow:'hidden',padding:"5em 3em 5em 3em"}} id={styles.phonenod}>
<div className={`${styled.containerfluid}`} >
            <div className="row" >
              <div className="col-lg-12">
                <div className={styled.horizontal_timeline}>
                  <ul className={`list-inline ${styled.items}`}>
                    <li className={`list-inline-item ${styled.items_list}`}>
                      <div className="px-4">
                        <div
                          className={`${styled.event_date} badge bg-info  text-white`}
                          style={{
                            backgroundColor: "#FF6600",
                            fontSize: 16,
                            padding: 6
                          }}
                        >
                          1
                        </div>
                        <h5
                          className="pt-2"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: 600
                          }}
                        >
                         A top-notch curriculum & Exceptional faculty
                        </h5>
                        <p
                          className="text-muted"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: 16,
                            color: "#000"
                          }}
                        >
                         An industry-oriented curriculum, designed by academic experts and industry leaders, is taught by highly experienced professors, ensuring practical knowledge.
                        </p>
                      </div>
                    </li>
                    <li className={`list-inline-item ${styled.items_list}`}>
                      <div className="px-4">
                        <div
                          className={`${styled.event_date} badge bg-info text-white`}
                          style={{
                            backgroundColor: "#FF6600",
                            fontSize: 16,
                            padding: 6
                          }}
                        >
                          2
                        </div>
                        <h5
                          className="pt-2"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: 600
                          }}
                        >
                         An interactive learning management system (LMS)
                        </h5>
                        <p
                          className="text-muted"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: 16,
                            color: "#000"
                          }}
                        >
                       The best interactive LMS should offer personalized learning paths for students. This can allow students to learn in a way that is best suited to their learning style.
                        </p>
                      </div>
                    </li>
                    <li className={`list-inline-item ${styled.items_list}`}>
                      <div className="px-4">
                        <div
                          className={`${styled.event_date} badge bg-info  text-white`}
                          style={{
                            backgroundColor: "#FF6600",
                            fontSize: 16,
                            padding: 6
                          }}
                        >
                          3
                        </div>
                        <h5
                          className="pt-2"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: 600
                          }}
                        >
                        Support for placements and other career goals
                        </h5>
                        <p
                          className="text-muted"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: 16,
                            color: "#000"
                          }}
                        >
                      Strong support for placements and career goals can provide students with access to job opportunities, internships, and other resources that can help them launch their careers.
                        </p>
                      </div>
                    </li>
                    <li className={`list-inline-item ${styled.items_list}`}>
                      <div className="px-4">
                        <div
                           className={`${styled.event_date} badge bg-info  text-white`}
                          style={{
                            backgroundColor: "#FF6600",
                            fontSize: 16,
                            padding: 6
                          }}
                        >
                           4
                        </div>
                        <h5
                          className="pt-2"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: 600
                          }}
                        >
                      A mentoring program for personalized learning
                        </h5>
                        <p
                          className="text-muted"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: 16,
                            color: "#000"
                          }}
                        >
                       Mentorship provides students with valuable career guidance and advice based on their own experiences in the industry to succeed in a student&rsquo;s chosen field.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
</section>
  <section
    id="programmes-st"
    style={{
      backgroundImage: "url(/lpu/LPU-imag-4.jpg)",
      backgroundSize: "cover"
    }}
  >
     <div className="container">
      <div className="row">
        <div className="col-md-7" id={styles.program_box}>
          <h4 className={styles.pr_h}>Online Programme Offered</h4>
          <p>Get a high-stature degree on completion of your programme.</p>
          <br />
          <div className="box2">
            {/* Tab Buttons */}
            <button
              onClick={() => setActiveTab("UG")}
              className={`${styles.tabButton} ${activeTab === "UG" ? styles.tabButtonActive : ""}`}
            >
              Under-Graduate Course
            </button>
            <button
              onClick={() => setActiveTab("PG")}
              className={`${styles.tabButton} ${activeTab === "PG" ? styles.tabButtonActive : ""}`}
            >
              Post-Graduate Course
            </button>

            {/* UG Courses */}
            {activeTab === "UG" && (
              <div>
                <table className={styles.table}>
                  <tbody className={styles.tbody}>
                    <tr className={styles.tr}>
                      <td className={styles.td}>
                        <span className={styles.sp} style={{ color: "#FF6600" }}>BA :</span> Bachelor of Arts
                      </td>
                    </tr>
                    <tr className={styles.tr}>
                      <td className={styles.td}>
                        <span className={styles.sp} style={{ color: "#FF6600" }}>BCA :</span> Bachelor of Computer Application
                      </td>
                    </tr>
                    <tr className={styles.tr}>
                      <td className={styles.td}>
                        <span className={styles.sp} style={{ color: "#FF6600" }}>BBA :</span> Bachelor of Business Administration
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* PG Courses */}
            {activeTab === "PG" && (
              <div>
                <table>
                  <tbody>
                    <tr className={styles.tr}>
                      <td className={styles.td}>
                        <span className={styles.sp} style={{ color: "#FF6600" }}>MA :</span> Master of Arts
                      </td>
                    </tr>
                    <tr className={styles.tr}>
                      <td className={styles.td}>
                        <span className={styles.sp} style={{ color: "#FF6600" }}>MBA :</span> Master of Business Administration
                      </td>
                    </tr>
                    <tr className={styles.tr}>
                      <td className={styles.td}>
                        <span className={styles.sp} style={{ color: "#FF6600" }}>MCA :</span> Master of Computer Application
                      </td>
                    </tr>
                    <tr className={styles.tr}>
                      <td className={styles.td}>
                        <span className={styles.sp} style={{ color: "#FF6600" }}>M.COM :</span> Master of Commerce
                      </td>
                    </tr>
                    <tr className={styles.tr}>
                      <td className={styles.td}>
                        <span className={styles.sp} style={{ color: "#FF6600" }}>MSc :</span> Master of Science
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        {/* Empty column for spacing */}
        <div className="col-md-5"></div>
      </div>
    </div>
    {/*end of container*/}
  </section>
  <div className={styles.features}>
    <div className="container">
      <div className="row">
        <div className={`col-md-3 ${styles.f_mobile}`}>
          <img src="/lpu/icon-1.png" className={styles.feature_img} />
          <br />
          <h5 style={{color:"white"}}>12+ Hours</h5>
          <p className={styles.p_feature}>
            Live Course Instruction
            <br /> Per Semester
          </p>
        </div>
        {/*end of col*/}
        <div className={`col-md-3 ${styles.f_mobile}`}>
          <img src="/lpu/icon-2.png"  className={styles.feature_img} />
          <br />
          <h5 style={{color:"white"}}>20+ Hours</h5>
          <p className={styles.p_feature}>
            Recorded course content
            <br /> per semester
          </p>
        </div>
        {/*end of col*/}
        <div className={`col-md-3 ${styles.f_mobile}`}>
          <img src="/lpu/icon-3.png"  className={styles.feature_img} />
          <br />
          <h5 style={{color:"white"}}>104</h5>
          <p className={styles.p_feature}>
            Total number of
            <br /> credits
          </p>
        </div>
        {/*end of col*/}
        <div className={`col-md-3 ${styles.f_mobile}`}>
          <img src="/lpu/icon-4.png" className={styles.feature_img} />
          <br />
          <h5 style={{color:"white"}}>08 Electives</h5>
          <p className={styles.p_feature}>
            General and Discipline
            <br /> Specific Elective
          </p>
        </div>
        {/*end of col*/}
      </div>
      {/*end of row*/}
    </div>
    {/*end of features*/}
  </div>
  <section id={styles.certificate}>
    <div className="container">
      <div className="row">
        <div className="col-md-1" />
        <div className="col-md-5">
          <img
            src="/lpu/LPU certificate MBA.png"
            className={styles.certificate}
          />
        </div>
        {/*end of col*/}
        <div className="col-md-5">
          <h3 className={styles.cer_h}>
            Get <span className={styles.sp} style={{color: "#FF6600"}}>UGC Entitled </span>Degree Which Enhance
            Your career
          </h3>
          <br />
          <img
            src="/lpu/degree from top ranked.png"
            classname={styles.cr_icon}
            align="left"
            style={{marginRight:"1em"}}
          />
          <h6 className={styles.cer_hh} >Degree from Top Ranked University</h6>
          <p className={styles.cer_p}>
            Obtain a high-status degree from India&rsquo;s top universities when you
            complete your programme
          </p>
          <hr />
          <img
            src="/lpu/Universally Accepted.png"
            classname={styles.cr_icon}
            align="left"
            style={{marginRight:"1em"}}
          />
          <h6 className={styles.cer_hh}>Universally Accepted</h6>
          <p className={styles.cer_p}>
            It is a globally recognized degree, which has been duly endorsed by
            the UGC
          </p>
          <hr />
          <img
            src="/lpu/No Difference From Campus Programme Degree.png"
            classname={styles.cr_icon}
            align="left"
            style={{marginRight:"1em"}}
          />
          <h6 className={styles.cer_hh}>No Difference From Campus Programme Degree</h6>
          <p className={styles.cer_p}>
            The degree is recognized by statutory bodies and is treated equally
            with regular degrees
          </p>
          <br />
            
            <button type="button" className={styles.btn1}
            onClick={() => {
              const fnameInput = document.getElementById("name");
              
              if (fnameInput) {
                fnameInput.scrollIntoView({ behavior: "smooth", block: "start" });
                fnameInput.focus(); // Instant focus without delay
              }
            }}>
              Apply Now
            </button>
        </div>
        {/*end of col*/}
        <div className="col-md-1" />
      </div>
      {/*end of row*/}
    </div>
    {/*end of container*/}
  </section>
  <section id={styles.approvals}>
      <div className="container">
        <h2 className={styles.apr_hd}>Approved & Recognized by</h2>
        <OwlCarousel className="owl-theme" {...options}>
          {approvals.map((item, index) => (
            <div key={index} className={styles.item}>
              <img src={item.img} width="100%" alt={item.title} />
              <h6 className={styles.apr_h}>{item.title}</h6>
              <p className={styles.ap_p}>{item.desc}</p>
            </div>
          ))}
        </OwlCarousel>
      </div>
    </section>
  <section
    id="about"
    style={{
      backgroundImage: "url(/lpu/lpu-black-White.png)",
      backgroundSize: "cover"
    }}
  >
    <br />
    <div className="container" id={styles.abt_ct}>
      <div className="row">
        <div className="col-md-12">
          <h2 className={styles.abt_h}>
            <strong>
              <span classname={styles.sp} style={{color: "#FF6600"}}>About </span>- Why Join LPU
            </strong>
          </h2>
          <p className={styles.abt_p}>
            Lovely Professional University (LPU) is one of the leading
            universities in India, established in 2005 which offers high-quality
            education to students from across the country. The university is
            known for its focus on providing a holistic learning experience that
            goes beyond academic education. At LPU, students are not only
            equipped with the knowledge and skills necessary to succeed in their
            chosen fields but they are also provided with many opportunities to
            develop their personal and professional skills.
          </p>
        </div>
      </div>
      {/*end of row*/}
      <div className="row">
        <div className={`col-md-3 ${styles.abt_sec}`}>
          <center>
            <img src="/lpu/3000+ students.png" />
          </center>
          <h3 className={styles.abt_h}>30000+</h3>
          <p className={styles.abt_pp}>STUDENTS</p>
        </div>
        {/*end of col*/}
        <div className={`col-md-3 ${styles.abt_sec}`}>
          <center>
            <img src="/lpu/50k+ alumini1.png" />
          </center>
          <h3 className={styles.abt_h}>50k+</h3>
          <center>
            <p className={styles.abt_pp}>ALUMNI</p>
          </center>
        </div>
        {/*end of col*/}
        <div className={`col-md-3 ${styles.abt_sec}`}>
          <center>
            <img src="/lpu/600+ CAMPUS EVENT.png" />
          </center>
          <h3 className={styles.abt_h}>600+</h3>
          <center>
            <p className={styles.abt_pp}>CAMPUS EVENTS</p>
          </center>
        </div>
        {/*end of col*/}
        <div className={`col-md-3 ${styles.abt_sec}`}>
          <center>
            <img src="/lpu/600+ PROFILE VISITOR.png" />
          </center>
          <h3 className={styles.abt_h}>600+</h3>
          <center>
            <p className={styles.abt_pp}>HIGH PROFILE VISITOR</p>
          </center>
        </div>
        {/*end of col*/}
      </div>
      {/*end of row*/}
    </div>
    {/*end of container*/}
  </section>
  <section id="recruiter">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h2 className={styles.abt_h}>
            <strong>
              <span classname={styles.sp} style={{color: "#FF6600"}}>Top Recruiter</span> Companies
            </strong>
          </h2>
          <div className={styles.desk_img}>
            <img src="/lpu/recruiters-desktop.png" width="100%" />
          </div>
          <div className={styles.mob_img}>
            <img src="/lpu/recruiters-mobile.png" width="100%" />
          </div>
        </div>
        {/*end of col*/}
      </div>
      {/*end of row*/}
    </div>
    {/*end of container*/}
  </section>
  <section id={styles.gr_info}>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h3 className={styles.gr_h}>
            <strong>
              <span classname={styles.sp} style={{color: "#FF6600"}}>Hear From</span> Real Student
            </strong>
          </h3>
          <p>What our Former Students have to say about our online LPU</p>
        </div>
        {/*end of col*/}
      </div>
      {/*end of row*/}
    </div>
    {/*end of container*/}
  </section>
  <section id={styles.footer_frm}>
    <div className="container" id={styles.cnt_frm}>
      <div className="row">
        <div className="col-md-6">
          <img src="/lpu/for popup.png" width="100%" />
        </div>
        {/*end of col*/}
        <div className="col-md-1" />
        <div className="col-md-4">
          <br />
          <div id={`${styles.form_ftr} form-ftr`}>
            <h3 className={styles.frm_heading}>Free Counseling</h3>
            <center>
              <p>Have Doubt? Talk FREE to Our Expert</p>
            </center>
            <hr />
            <form
              method="post"
              name="form"
              id="enquiry-form"
              onSubmit={handleSubmit}
            > <br />
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name"
                className="form-control"
                required
                value={formData.name}
                onChange={handleChange}
              /> <br />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                className="form-control"
                required
                value={formData.email}
                onChange={handleChange}
              /> <br />
              <input
                type="tel"
                id="phone"
                name="phoneNumber"
                maxLength="10"
                className="form-control"
                placeholder="Enter your phone number"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
              /> <br />
              <select
                name="course"
                className="form-control"
                id="course"
                required
                value={formData.course}
                onChange={handleChange}
              >
                <option value="" hidden="">
                  Select Your Course
                </option>
                <option value="BA">BA</option>
                <option value="BCOM">B.COM</option>
                <option value="BCA">BCA</option>
                <option value="MBA">MBA</option>
                <option value="MA">MA</option>
                <option value="MCOM">M.COM</option>
                <option value="MSC">MSC</option>
                <option value="MCA">MCA</option>
              </select> <br />
              <select
                name="location"
                className="form-control"
                id="location"
                required
                value={formData.location}
                onChange={handleChange}
              > 
                <option value="" hidden="">
                  Select Your State
                </option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar </option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Delhi">Delhi</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat </option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand </option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh </option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya </option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha </option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim </option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura </option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand </option>
                <option value="West Bengal">West Bengal </option>
              </select>
              <input
                type="hidden"
                name="source"
                id="source"
                placeholder="Enter your source"
                className="form-control"
                defaultValue="LPU"
                required=""
              />
              <br />
              <input
                type="hidden"
                name="sub_source"
                id="sub_source"
                className="form-control"
                defaultValue=""
              />
              <input
                type="hidden"
                name="utm_source"
                id="utm_source"
                className="form-control"
                defaultValue=""
              />
              <input
                type="hidden"
                name="utm_medium"
                id="utm_medium"
                className="form-control"
                defaultValue=""
              />
              <input
                type="hidden"
                name="utm_term"
                id="utm_term"
                className="form-control"
                defaultValue=""
              />
              <center>
              <button
                  type="submit"
                  name="submit"
                  className={styles.sub_btn}
                  disabled={loading} // Disable while loading
                >               
                  {loading ? (
                    <div className={styles.loader}></div> // Show loader when loading is true
                  ) : (
                    "Submit"
                  )}
              </button>
              </center>
            </form>
          </div>{" "}
        </div>
        {/*end of col*/}
        <div className="col-md-1" />
      </div>
      {/*end of row*/}
    </div>
    {/*end of container*/}
  </section>
  <section id={styles.footer}>
    <div className="container">
      <div className="row">
        <div className="col-md-5">
          <img src="/lpu/footer-logo.png" width="70%" />
          <br />
          <p>
            LPU is a university in India. The University was established in
            2005. It belongs to one of the top distance universities and is also
            approved by the UGC. Online LPU admission in undergraduate and
            postgraduate courses via online learning.
          </p>
        </div>
        {/*end of col*/}
        <div className="col-md-3">
          <p className={styles.ftr_h}>More courses</p>
          <li>BA</li>
          <li>BCA</li>
          <li>BBA</li>
          <li>MA</li>
          <li>
            <a href="https://upschol.com/online-lpu">MBA</a>
          </li>
          <li>MCA</li>
          <li>M.COM</li>
          <li>MSc</li>
        </div>
        {/*end of col*/}
        <div className="col-md-3">
          <p className={styles.ftr_h}>Recognization &amp; Approvals</p>
          <p>
            University Grant commision (UGC) Distance Education Beurea (DEB)
            National Institutional Ranking Framework (NIRF) All India Council
            for Technical Education (AICTE) The World University Ranking 2022
            Outlook ICARE Ranking 2021
          </p>
        </div>
        {/*end of col*/}
      </div>
      {/*end of row*/}
      <br />
      <br />
      <div className="row">
        <div className="col-md-5">
          <p className={styles.ftr_h}>Contact Us</p>
          <p>
            Centre for Distance and Online Education, Lovely Professional
            University, Jalandhar - Delhi G.T. Road, Phagwara, Punjab (India),
            144411
          </p>
        </div>
        {/*end of col*/}
        <div className="col-md-4">
          <p className={styles.ftr_h}>Make A Step Towards A Success Journey</p>
          <p>
            <strong>
              Have Any Query?
              <br />
            </strong>{" "}
            Take Acaedmic Mentor Guidance
          </p>
        </div>
        {/*end of col*/}
        <div className="col-md-3">
            {" "}
            <button type="button" className={styles.footer_btn} onClick={() => {
                const fnameInput = document.getElementById("name");
                
                if (fnameInput) {
                  fnameInput.scrollIntoView({ behavior: "smooth", block: "start" });
                  fnameInput.focus(); // Instant focus without delay
                }
              }}>
              <i className="fa fa-phone" /> &nbsp;&nbsp;&nbsp;Request a Call
              Back
            </button>
        </div>
        {/*end of col*/}
      </div>
      {/*end of row*/}
      <hr className={styles.footer_hr} />
      <p className={styles.copyright}>
        © 2025 Copyright Lovely Professional University
      </p>
    </div>
    {/*end of container*/}
  </section>
</>
)
}

export default Lpu