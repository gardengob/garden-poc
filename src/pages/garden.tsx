import dynamic from 'next/dynamic'

const Garden3d = dynamic(import('../components/garden3d/Garden3d'), {
  ssr: false,
})

export default function Garden() {
  return (
    <>
      <Garden3d />
    </>
  )
}
