import { Work_Sans, Poppins} from 'next/font/google'

const work_sans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work',
})

// const poppins= Poppins({
//     subsets: ['latin'],
//     variable: '--font-poppins',
    
//   })

export default function Layout ({children}) {
    return (
        <main className={`${work_sans.variable} font-sans bg-gray-50`}>
            {children}
        </main>
    )
}