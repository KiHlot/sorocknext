import { HomeTPLPropsIF } from "@/templates/HomeTPL/HomeTPL.types"
import { FC } from "react"
import styles from "@/templates/HomeTPL/HomeTPL.module.scss"

const HomeTPL: FC<HomeTPLPropsIF> = ({ className }) => {
  const temp = "remove_this"

  return <div className={`${styles.wrapper} ${className || ""}`}>HomeTPLasdasd</div>
}

export default HomeTPL
