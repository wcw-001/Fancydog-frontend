import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import {useIntl} from "umi";
import React from "react";


const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '江西工程学院wcw出品',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'OA办公系统',
          title: 'OA办公系统',
          href:'PLANET_LINK',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'Ant Design',
          href: 'https://ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title:<><GithubOutlined /> wcw Github</>,
          href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true,
        },

      ]}
    />
  );
};

export default Footer;
