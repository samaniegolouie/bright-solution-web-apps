// import { FaLinkedinIn, FaFacebookF, FaYoutube } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialLinkedin } from "react-icons/ti";
import { BiLogoYoutube } from "react-icons/bi";


export default function Footer() {
  return (
    <div className="flex flex-col items-center justify-center bg-[#6B0000] text-white py-10">
      <p className="text-lg mb-4">Bright Solutions • Generative AI Toolkit</p>

      {/* Icon Links */}
      <div className="flex items-center gap-6">
        {/* Facebook */}
        <a
          href="https://www.facebook.com/katiebrightsolutions/"
          target="_blank"
          
          rel="noopener noreferrer"
          className="hover:opacity-80 transition"
        >
          <TiSocialFacebook className="w-6 h-6 text-white" />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/katiebrightsolutions/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition"
        >
          <TiSocialLinkedin className="w-6 h-6 text-white" />
        </a>

        {/* YouTube */}
        <a
          href="https://www.youtube.com/@brightsolutionsconsulting"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition"
        >
          <BiLogoYoutube className="w-6 h-6 text-white" />
        </a>
      </div>
    </div>
  );
}
