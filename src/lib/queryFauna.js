const endpoint = `https://graphql.fauna.com/graphql`

const queryFauna = async ({ query, variables, secret }) => {

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Schema-Preview': 'partial-update-mutation'
    },
    body: JSON.stringify({
      query,
      variables
    })
  })

  // const json1 = await res.json()
  // console.log('response from graphql fetcher', res)
  if (res.status === 200) {
    const json = await res.json()
    console.log('json from graphql fetcher', json)
    if (json.errors) {
      // console.log('errors from graphql fetcher', json.errors)
      throw new Error(json.errors)

    } else {
      return json.data
    }
  } else {
    throw new Error("There was an error in fetching the graphql endpoint")
  }
}

export default queryFauna