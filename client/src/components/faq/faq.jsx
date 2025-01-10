import Accordion from '../accordion/accordion';
import styles from './faq.module.css';

function Faq() {
  const items = [
    {
      title: 'Jakie oferty znajdę na portalu NaszDom?',
      content:
        'Na portalu NaszDom znajdziesz szeroką gamę ofert nieruchomości na sprzedaż i wynajem, w tym mieszkania, domy, działki, lokale użytkowe, garaże oraz hale i magazyny.',
    },
    {
      title: 'Dlaczego warto korzystać z NaszDom?',
      content:
        'NaszDom to intuicyjny i łatwy w obsłudze portal, który umożliwia szybkie znalezienie wymarzonej nieruchomości. Oferujemy aktualne ogłoszenia, zaawansowane filtry wyszukiwania oraz bezpośredni kontakt ze sprzedającymi.',
    },
    {
      title: 'Jak dodać własne ogłoszenie?',
      content:
        'Aby dodać własne ogłoszenie, załóż konto na NaszDom, a następnie skorzystaj z formularza dodawania ogłoszenia w swoim profilu. Wprowadź szczegóły nieruchomości, dodaj zdjęcia i opublikuj ofertę.',
    },
    {
      title: 'Czy mogę edytować lub usunąć swoje ogłoszenie?',
      content:
        'Tak, możesz w dowolnym momencie edytować lub usunąć swoje ogłoszenie. Wystarczy zalogować się na swoje konto, przejść do sekcji "Moje ogłoszenia" i wybrać odpowiednią opcję przy wybranej ofercie.',
    },
    {
      title: 'Jak skontaktować się ze sprzedającym?',
      content:
        'W każdym ogłoszeniu znajdziesz dane kontaktowe sprzedającego lub formularz kontaktowy. Możesz bezpośrednio zadzwonić, wysłać e-mail lub skorzystać z wbudowanego systemu wiadomości na portalu.',
    },
    {
      title: 'Czy korzystanie z portalu jest płatne?',
      content:
        'Podstawowe korzystanie z portalu NaszDom jest bezpłatne. Możesz przeglądać oferty i dodawać ogłoszenia bez żadnych opłat. Oferujemy także opcjonalne płatne usługi promowania ogłoszeń dla zwiększenia ich widoczności.',
    },
    {
      title: 'Jakie są zasady bezpieczeństwa podczas korzystania z portalu?',
      content:
        'Dbamy o bezpieczeństwo naszych użytkowników. Zalecamy nie udostępniać poufnych informacji, weryfikować tożsamość sprzedających oraz korzystać z bezpiecznych form płatności. Więcej informacji znajdziesz w naszej sekcji "Bezpieczeństwo".',
    },
  ];

  return (
    <div className={styles.faqContainer}>
      <h3 className={styles.faqHeader}>Najczęściej zadawane pytania</h3>
      <Accordion items={items} />
    </div>
  );
}

export default Faq;
