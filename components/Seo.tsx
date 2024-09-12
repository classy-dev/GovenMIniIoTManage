import Head from "next/head";

const Seo = ({
  title,
  description,
  image,
  url,
  children,
}: React.PropsWithChildren<{
  title: string;
  description: string;
  image: string;
  url: string;
}>) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={url} />
      {/** 필요에 따라 변경 */}
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Event",
        name: "Cheer for the World Cup Qualifiers with GOPIZZA!",
        description:
          "Join us in supporting the thrilling FIFA World Cup Preliminary match between Singapore and Korea on June 6th! Celebrate with GOPIZZA and enjoy exclusive discounts to keep you well-fed while cheering for your favorite team. Download your coupon now and find a nearby GOPIZZA store to enjoy delicious deals!",
        startDate: "2024-05-27T00:00+08:00",
        endDate: "2024-06-06T23:59+08:00",
        location: {
          "@type": "Place",
          name: "GOPIZZA Locations",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Multiple Locations",
            addressCountry: "SG",
          },
        },
        offers: {
          "@type": "Offer",
          url: "https://promotion.gopizza.sg#coupon",
          category: "Discount",
          priceCurrency: "SGD",
          availability: "https://schema.org/InStock",
          validFrom: "2024-05-27T00:00+08:00",
          validThrough: "2024-06-06T23:59+08:00",
        },
        performer: {
          "@type": "SportsTeam",
          name: [
            "Singapore National Football Team",
            "Korea National Football Team",
          ],
        },
      })}
      {children}
    </Head>
  );
};

export default Seo;
