import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">© 2024</div>
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">
              Twitter
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">
              LinkedIn
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">
              Email
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">
              RSS feed
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">
              Add to Feedly
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
