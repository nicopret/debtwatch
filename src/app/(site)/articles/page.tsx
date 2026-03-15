import ArticleIndexContainer from "@/containers/articleContainers/ArticleIndexContainer";

export const metadata = {
  title: "Articles | DebtWatch",
  description: "DebtWatch explainers and source-led article pages.",
};

export default function ArticlesPage() {
  return (
    <section className="site-container metrics-section">
      <ArticleIndexContainer />
    </section>
  );
}

