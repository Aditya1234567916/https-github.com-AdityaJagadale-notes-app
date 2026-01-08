import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import { Button, Card } from 'semantic-ui-react'

const Index = ({ notes }) => {
  return (
    <div className='notes-Container'>
      <h1>Notes</h1>
      <div className='grid wrapper'>
        {notes.length > 0 ? notes.map(note => (
          <div key={note._id}>
            <Card>
              <Card.Content>
                <Card.Header>
                  <Link href={`/${note._id}`}>
                    <a>{note.title}</a>
                  </Link>
                </Card.Header>
              </Card.Content>
              <Card.Content extra>
                <Link href={`/${note._id}`}>
                  <Button primary>View</Button>
                </Link>
                <Link href={`/${note._id}/edit`}>
                  <Button primary>Edit</Button>
                </Link>
              </Card.Content>
            </Card>
          </div>
        )) : <p>No notes found.</p>}
      </div>
    </div>
  )
}

Index.getInitialProps = async () => {
  try {
    // Use local API for development
    const res = await fetch('http://localhost:3000/api/notes')
    
    // Check if the response is okay
    if (!res.ok) {
      throw new Error(`API responded with status ${res.status}`)
    }

    const json = await res.json()
    return { notes: json.data || [] } // fallback to empty array
  } catch (err) {
    console.error('Failed to fetch notes:', err)
    return { notes: [] } // return empty array if API fails
  }
}

export default Index

