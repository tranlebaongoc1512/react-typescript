import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useTheme from './hooks/useTheme';

export default function Footer() {
    const { theme } = useTheme();
    return (
        <footer>
            <p style={{ color: theme.color }}><FontAwesomeIcon icon={faCopyright} /> Copyright by TLBN</p>
        </footer>
    )
}
