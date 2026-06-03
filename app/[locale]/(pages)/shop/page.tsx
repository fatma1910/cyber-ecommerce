import { getTranslations } from "next-intl/server";

const page = async () => {
  const t = await getTranslations("shop");

  return (
    <section className="padding">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <p className="mt-2 text-sm text-gray-500">{t("description")}</p>
    </section>
  );
};

export default page;
