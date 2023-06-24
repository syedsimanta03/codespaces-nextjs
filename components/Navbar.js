
const links = [
  { label: 'Home', url: '/' },
  { label: 'Backlink', url: '/backlink' },
  { label: 'OTP', url: '/otp' }
]

const Navbar = () => {
  return (
    <nav className='flex justify-center py-4'>
      <ul className='flex space-x-4 text-white'>
        {links?.map((link, index) => (
          <li key={index}>
            <a href={link.url} className='hover:text-gray-300 link'>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar