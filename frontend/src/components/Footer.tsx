import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-12 mt-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Global Travel
            </h3>
            <p className="text-sm text-gray-500">Explore the world with us</p>
          </div>

          {/* Links */}
          <div className="flex gap-8">
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Destinations
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Support
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Social */}
          <div className="flex gap-4">
            
            <a
              href="https://www.instagram.com/gtc_mongolia/"
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors"
            >
              <InstagramIcon/>
            </a>
            <a
              href="https://www.facebook.com/global.travel.corporation.mongolia"
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors"
            >
             <FacebookIcon/>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Global Travel. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
