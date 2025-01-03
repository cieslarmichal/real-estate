import { backendUrl } from '../../constants/api'
import styles from './hero.module.css'

function Hero() {
  const heroImageUrl = `${backendUrl}/img/naszdom/hero/hero15.jpg`;

  return (
    <div className={styles.hero} style={{backgroundImage: `url(${heroImageUrl})`}}>
    </div>
  )
}

export default Hero;
