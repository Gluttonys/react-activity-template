import React, { useEffect, useState } from 'react';

type UltimateImageProps = {
  /** @desc miniSource： 小图资源地址 */
  miniSource: string;
  /** @desc source： 大图资源地址 */
  source?: string;
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'>;

/**
 * 图片组件
 * @desc 优化首页加载的图片的加载速度
 *
 * @todo 仅给出缩略占位图地址， 自动查找高清图加载
 * ! require 无法动态加载地址
 *
 * @param {React.PropsWithChildren<UltimateImageProps>} props
 * @return {JSX.Element<HTMLImageElement>>}
 * @constructor
 */
const UltimateImage: React.FC<UltimateImageProps> = (props) => {
  const { miniSource, source, ...rawImgProps } = props;

  const [localSrc, setLocalSrc] = useState('');

  useEffect(() => {
    const imageDom: HTMLImageElement = new Image();

    imageDom.setAttribute('src', miniSource);

    new Promise((resolve) => {
      imageDom.onload = () => {
        resolve(imageDom);
        setLocalSrc(miniSource);
      };
      /** 失败： 继续加载大图 */
      imageDom.onerror = () => resolve(imageDom);
    })
      .then((imageDom) => {
        if (source !== undefined) {
          (imageDom as HTMLImageElement).setAttribute('src', source);
          (imageDom as HTMLImageElement).onload = () => setLocalSrc(source);
        }
      })
      .catch(console.error)
      .finally(() => ((imageDom as unknown) = null));
  }, []);

  return <img src={localSrc} alt="" {...rawImgProps} />;
};

export default UltimateImage;
