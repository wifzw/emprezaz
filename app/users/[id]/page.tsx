export interface IUserPageProps {
  params: {
    id: string;
  }
}

export default function UserPage(props: IUserPageProps) {
  const { id } = props.params

  return (
    <p>{ id } </p>
  )
}