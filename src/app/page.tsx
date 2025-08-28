

 export default function Home() {
  return(
     <>
         <div className="hero-container my-6">
             <div className="hero-section-container">
                 <h1 className="hero-section-heading">
                     Discover Your Next Great Read with Expert Curation
                 </h1>
                 <p className="my-6 hero-section-text">
                     At Naredko, we build professional digital platforms for book lovers and researchers, making it easy to explore, access, and enjoy a world of knowledge at your fingertips.
                 </p>
                 <a href="#homeContainer" className="library-button">Explore Now</a>
             </div>
         </div>
         <div className="container mx-auto px-4" id="homeContainer">
             {/* <!-- category section --> */}
             <h1 className="library-heading text-center mt-6">
                 Discover a world of knowledge
             </h1>
            
             <div className="flex flex-wrap -mx-4 pb-3">
                 <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 mt-3">
                     <a href="/categories/fiction" className="gallery-clickable-content">
                         <div className="gallery-container fiction-container">
                             <div className="gallery-black-small-box-subcontainer px-4 py-2">
                                 <div className="icon-container ">
                                     <div className="icon-heading">
                                         <h1 className="gallery-heading">Fiction</h1>
                                     </div>
                                     <div className="icon-subcontainer">
                                         <img src="images/arrow.png" alt=""/>
                                     </div>
                                 </div>
                                 <div className="mt-1">
                                     <p className="gallery-text">Books Available: 250+</p>
                                 </div>
                             </div>    
                         </div>
                     </a>
                 </div>
                 <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 mt-3">
                     <a href="/categories/children" className="gallery-clickable-content">
                         <div className="gallery-container children-container">
                             <div className="gallery-black-small-box-subcontainer px-4 py-2">
                                 <div className="icon-container ">
                                     <div className="icon-heading">
                                         <h1 className="gallery-heading">Children</h1>
                                     </div>
                                     <div className="icon-subcontainer">
                                         <img src="images/arrow.png" alt=""/>
                                     </div>
                                 </div>
                                 <div className="mt-1">
                                     <p className="gallery-text">Books Available: 180+</p>
                                 </div>
                             </div>
                         </div>
                     </a>
                 </div>
                 <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 px-4 mt-3">
                     <a href="/categories/history" className="gallery-clickable-content">
                         <div className="gallery-container history-container">
                             <div className="gallery-black-large-box-subcontainer px-4 py-2">
                                 <div className="icon-container ">
                                     <div className="icon-heading">
                                         <h1 className="gallery-heading">History</h1>
                                     </div>
                                     <div className="icon-subcontainer">
                                         <img src="images/arrow.png" alt=""/>
                                     </div>
                                 </div>
                                 <div className="mt-1">
                                     <p className="gallery-text">Books Available : 145+</p>
                                 </div>
                             </div>
                         </div>
                     </a>
                 </div>
                 <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 px-4 mt-3">
                     <a href="/categories/all" className="gallery-clickable-content">
                         <div className="gallery-container all-container">
                             <div className="gallery-black-large-box-subcontainer px-4 py-2">
                                 <div className="icon-container ">
                                     <div className="icon-heading">
                                         <h1 className="gallery-heading">All </h1>
                                     </div>
                                     <div className="icon-subcontainer">
                                         <img src="images/arrow.png" alt=""/>
                                     </div>
                                 </div>
                                 <div className="mt-1">
                                     <p className="gallery-text">Books Available : 200+</p>
                                 </div>
                             </div>
                         </div>
                     </a>
                 </div>
                 <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 mt-3">
                     <a href="/categories/biography" className="gallery-clickable-content">
                         <div className="gallery-container biography-container">
                             <div className="gallery-black-small-box-subcontainer px-4 py-2">
                                 <div className="icon-container ">
                                     <div className="icon-heading">
                                         <h1 className="gallery-heading">Biography </h1>
                                     </div>
                                     <div className="icon-subcontainer">
                                         <img src="images/arrow.png" alt=""/>
                                     </div>
                                 </div>
                                 <div className="mt-1">
                                     <p className="gallery-text">Books Available : 125+</p>
                                 </div>
                             </div>
                         </div>
                     </a>
                 </div>
                 <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 mt-3">
                     <a href="/categories/arts" className="gallery-clickable-content">
                         <div className="gallery-container art-container">
                             <div className="gallery-black-small-box-subcontainer px-4 py-2">
                                 <div className="icon-container ">
                                     <div className="icon-heading">
                                         <h1 className="gallery-heading">Arts</h1>
                                     </div>
                                     <div className="icon-subcontainer">
                                         <img src="images/arrow.png" alt=""/>
                                     </div>
                                 </div>
                                 <div className="mt-1">
                                     <p className="gallery-text">Books Available : 230+</p>
                                 </div>
                             </div>
                         </div>
                     </a>
                 </div>
             </div>

             {/* <!-- why choose us? section --> */}
             <h1 className="library-heading text-center mt-5 mb-3">Why Choose Our Library?</h1>
             <div className="flex flex-wrap -mx-4">
                 <div className="w-full sm:w-full md:w-full lg:w-5/12 px-4 pb-3">
                     <img src="/images/my-books.jpg" alt="" className="section3-images"/>
                 </div>

                 <div className="w-full sm:w-full md:w-full lg:w-7/12 px-4 pb-3">
                     <div className="flex flex-wrap -mx-4">
                         <div className="w-full sm:w-full md:w-full lg:w-6/12 px-4 my-3">
                             <div className="section-boxes">
                                 <h1 className="library-subheading">Expertise and Knowledge</h1>
                                 <p className="library-text">Offers a curated collection of quality books, categorized and organized for easy discovery by genre, author, or popularity.</p>
                             </div>
                         </div>
                         <div className="w-full sm:w-full md:w-full lg:w-6/12 px-4 my-3">
                             <div className="section-boxes">
                                 <h1 className="library-subheading">
                                     Time and Stress Savings</h1>
                                 <p className="library-text">
                                     Simplifies your reading journey with smart search, filters, and personalized recommendations—no more endless browsing.
                                 </p>
                             </div>
                         </div>
                         <div className="w-full sm:w-full md:w-full lg:w-6/12 px-4 my-3">
                             <div className="section-boxes">
                                 <h1 className="library-subheading">
                                     Community and Contribution
                                 </h1>
                                 <p className="library-text">
                                     Allows readers to submit books and share knowledge, while admins ensure every submission is verified and appropriate.
                                 </p>
                             </div>
                         </div>
                         <div className="w-full sm:w-full md:w-full lg:w-6/12 px-4 my-3">
                             <div className="section-orange-boxes">
                                 <h1 className="library-subheading">
                                     Access Anytime, Anywhere
                                 </h1>
                                 <p className="library-text">
                                     Enjoy unlimited access to books—whether at home, school, or on the go—on any device, 24/7.
                                 </p>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
    </>
  );
}
