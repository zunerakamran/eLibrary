export default function Footer() {
  return (
     <footer className="bg-black text-white rounded-xl px-10 py-30 my-5">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
         <div>
             <img src="/images/logo.png" alt="Logo" className="w-[250px] h-[120px]"/>
        </div>

         <div>
             <h3 className="text-xl font-semibold mb-4">Pages</h3>
             <ul className="space-y-2">
                 <li><a href="/" className="hover:text-orange-400">Home</a></li>
                 <li><a href="/about" className="hover:text-orange-400">About</a></li>
                 <li><a href="/contact" className="hover:text-orange-400">Contact</a></li>
             </ul>
         </div>

         <div>
             <h3 className="text-xl font-semibold mb-4">Categories</h3>
             <ul className="space-y-2">
                 <li><a href="/books/fiction" className="hover:text-orange-400">Fiction</a></li>
                 <li><a href="/books/history" className="hover:text-orange-400">History</a></li>
                 <li><a href="/books/children" className="hover:text-orange-400">Children</a></li>
             </ul>
         </div>
      </div>
    </footer>
  );
}
