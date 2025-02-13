import { Github, Linkedin, ThumbsUp } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Muslim Daily</h3>
            <p className="text-sm">Developmnt by usri.yusron</p>
          </div>
          <div className="flex space-x-4">
            <a
              href="http://github.com/Usri-Yusron"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-foreground"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/muhamad-usriyusron/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-foreground"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://usriyusron.my.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-foreground"
            >
              <ThumbsUp size={24} />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} MuslimDaily All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

