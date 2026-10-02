type DemoRequestFormLabels = {
  title: string;
  body: string;
  name: string;
  namePlaceholder: string;
  gym: string;
  gymPlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  city: string;
  cityPlaceholder: string;
  country: string;
  countryPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
};

export function DemoRequestForm({labels}: {labels: DemoRequestFormLabels}) {
  return (
    <form className="gm-demo-form" aria-labelledby="demo-form-title">
      <div className="gm-demo-form__heading">
        <p className="gm-kicker">GYM MASTER</p>
        <h2 id="demo-form-title">{labels.title}</h2>
        <p>{labels.body}</p>
      </div>

      <div className="gm-demo-form__fields">
        <label><span>{labels.name}</span><input name="name" type="text" autoComplete="name" placeholder={labels.namePlaceholder} required /></label>
        <label><span>{labels.gym}</span><input name="gym" type="text" autoComplete="organization" placeholder={labels.gymPlaceholder} required /></label>
        <label><span>{labels.email}</span><input name="email" type="email" autoComplete="email" placeholder={labels.emailPlaceholder} required /></label>
        <label><span>{labels.phone}</span><input name="phone" type="tel" autoComplete="tel" placeholder={labels.phonePlaceholder} /></label>
        <label><span>{labels.city}</span><input name="city" type="text" autoComplete="address-level2" placeholder={labels.cityPlaceholder} /></label>
        <label><span>{labels.country}</span><input name="country" type="text" autoComplete="country-name" placeholder={labels.countryPlaceholder} /></label>
        <label className="gm-demo-form__message"><span>{labels.message}</span><textarea name="message" rows={5} placeholder={labels.messagePlaceholder} /></label>
      </div>

      <button className="gm-demo-form__submit" type="button" data-cta-intent="submit-demo-request">
        <span>{labels.submit}</span>
        <i aria-hidden="true">{"\u2197"}</i>
      </button>
    </form>
  );
}
