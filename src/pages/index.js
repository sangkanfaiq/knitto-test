import TodoLayout from "@/layouts/TodoApp"
import { store } from "@/redux/store"
import { Provider } from "react-redux"


export default function Home({data}) {
  return (
    <Provider store={store}>
      <TodoLayout data={data} />
    </Provider>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`)
  const data = await res.json()

  return { props: { data } }
}
