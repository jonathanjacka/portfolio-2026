import type {
  IconDefinition,
  SizeProp,
} from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IconProps {
  href: string;
  icon: IconDefinition;
  size: SizeProp;
  key?: string;
}

const SocialIcon = (props: IconProps) => {
  return (
    <a href={props.href} target='_blank' rel='noreferrer'>
      <i className='footer-icon text-base-content/70 hover:text-base-content transition-colors'>
        <FontAwesomeIcon icon={props.icon} size={props.size || '1x'} />
      </i>
    </a>
  );
};

export default SocialIcon;
