import { useTranslation } from "react-i18next";
import Seo from "./components/SEO";
import localeFn from "../utils/locale";

export async function getServerSideProps({ req, locale }) {
  const NextRequestMetaSymbol = Reflect.ownKeys(req).find(
    (key) => key.toString() === "Symbol(NextRequestMeta)"
  );
  const url = req[NextRequestMetaSymbol].__NEXT_INIT_URL;
  const language =
    req[NextRequestMetaSymbol].__NEXT_INIT_QUERY?.language || null;
  const languageConfig = localeFn.languageConfig(locale, language);

  const resp = await fetch("https://fake-comic-api.herokuapp.com/comic");

  return {
    props: {
      url,
      language: languageConfig.symbol.toLowerCase(),
      comic: await resp.json(),
    },
  };
}

export default function Home({ comic, url }) {
  const { t } = useTranslation();

  return (
    <div>
      <Seo
        title="CSR - Comic books"
        description="CSR - comic book study"
        image="https:/bsfd"
        keywords="test, rewds"
        url={url}
      />

      <div className="container">
        <h2>Comic List</h2>

        <div className="grid">
          {comic.map((comic) => (
            <div className="card" key={comic.id}>
              <a href={`/comic/${comic.id}`}>
                <img src={comic.imageSrc} alt={comic.title} />
                <h4>{comic.title}</h4>
              </a>
            </div>
          ))}
        </div>

        <h2>{t("good")}</h2>
        <h2>{t("better")}</h2>
        <h2>{t("best")}</h2>
        <h2>{t("bad")}</h2>
        <h2>{t("worse")}</h2>
        <h2>{t("worst")}</h2>
      </div>
    </div>
  );
}
