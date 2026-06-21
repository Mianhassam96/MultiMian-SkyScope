export default function Footer() {
return ( <footer className="bg-blue-800 text-white py-4"> <div className="container mx-auto text-center"> <p>
© {new Date().getFullYear()}{" "} <a
         href="https://multimian.com"
         target="_blank"
         rel="noopener noreferrer"
         className="hover:underline"
       >
MultiMian </a>
. All rights reserved. </p> </div> </footer>
)
}
