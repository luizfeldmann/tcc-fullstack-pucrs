import { useI18nContext } from "../../localization/i18n-react";

const About = () => {
  const { LL } = useI18nContext();

  return (
    <div>
      <h1>{LL.About.Title()}</h1>
    </div>
  );
};

export default About;
