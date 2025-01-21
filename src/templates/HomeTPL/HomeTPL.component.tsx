import { HomeTPLPropsIF } from "@/templates/HomeTPL/HomeTPL.types"
import { FC } from "react"
import styles from "@/templates/HomeTPL/HomeTPL.module.scss"

const HomeTPL: FC<HomeTPLPropsIF> = ({ props }) => {
  const temp = "remove_this"

  return <div className={styles.wrapper}>HomeTPLasdasd</div>
}

export default HomeTPL
