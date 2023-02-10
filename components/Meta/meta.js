import Head from "next/head";

const Meta = ({title, keywords, description}) => {
  return (
    <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keywords} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  )
}

Meta.defaultProps = {
    title:'Events App',
    keywords: 'events, travel',
    description: 'An events app created with next js'
}
export default Meta