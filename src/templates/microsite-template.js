import React from "react";
import styles from "../layouts/about-css-modules.module.css";

const SectionHigh = props =>
    <div className={styles.user}>
        <p className={styles.descriptionFactor}> Students at <b>{props.school_name}</b> rated <b>{props.factor_high_name}</b> most positively when compared to other high schools in that also took the Overall School Experience survey.</p>
        <img className={styles.avatar} src="https://media1.tenor.com/images/78d9dbd09eec10c041340391b0ad3fbc/tenor.gif?itemid=5178993"></img>
    </div>

const QuestionHigh = props =>
    <div className={styles.user}>
        <img className={styles.avatar} src="https://media1.tenor.com/images/78d9dbd09eec10c041340391b0ad3fbc/tenor.gif?itemid=5178993"></img>
        <p className={styles.descriptionItem}> The <b>least positively rated</b> question by students at <b>{props.school_name}</b> was <b>{props.item_high_name}</b> </p>
    </div>

const SectionLow = props =>
    <div className={styles.user}>
        <p className={styles.descriptionFactor}> Students at <b>{props.school_name}</b> rated <b>{props.factor_low_name}</b> least positively when compared to other high schools in that also took the Overall School Experience survey.</p>
        <img className={styles.avatar} src="https://media1.tenor.com/images/78d9dbd09eec10c041340391b0ad3fbc/tenor.gif?itemid=5178993"></img>
    </div>

const QuestionLow = props =>
    <div className={styles.user}>
        <img className={styles.avatar} src="https://media1.tenor.com/images/78d9dbd09eec10c041340391b0ad3fbc/tenor.gif?itemid=5178993"></img>
        <p className={styles.descriptionItem}> The <b>least positively rated</b> question by students at <b>{props.school_name}</b> was <b>{props.item_low_name}</b> </p>
    </div>

const Title = props =>
    <div>
        <p>The highest factor was: {props.factor_high_name}</p>
        <p>The lowest factor was: {props.factor_low_name}</p>
        <p>{props.response_count}</p>
        <p>{props.item_low_name}</p>
        <p>{props.item_high_name}</p>
        <p>{props.response_rate}</p>
    </div>

const Response = props =>
    <div className={styles.user}>
      <p className={styles.description}><b>{props.response_count}</b> {props.school_name} students responded to the Youth Truth Overall School Experience survey. A response rate of <b>{props.response_rate}</b>!</p>
    <div className={styles.avatar}>
      <svg width="100%" height="100%" viewBox="0 0 42 42" className="donut">
      <circle className="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
      <circle className="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#d2d3d4" strokeWidth="3"></circle>
      <circle className="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#0fb2cb" strokeWidth="3" strokeDasharray={props.donut_specs} strokeDashoffset="25"></circle>
      </svg>
    </div>
    </div>

export default ({ data }) => {
  return(
    <div>
    <h1>{data.dataJson.school_name}</h1>
    <Response
      response_count={data.dataJson.response_count}
      response_rate={data.dataJson.response_rate}
      school_name={data.dataJson.school_name}
      donut_specs={data.dataJson.response_rate.substring(0,data.dataJson.response_rate.length - 1) + " " + String(100 - parseInt(data.dataJson.response_rate.substring(0,data.dataJson.response_rate.length - 1)))}
    />
    <SectionHigh
      factor_high_name={data.dataJson.factor_high_name}
      school_name={data.dataJson.school_name}
    />
    <QuestionHigh
      item_high_name={data.dataJson.item_high_name}
      school_name={data.dataJson.school_name}
    />
    <SectionLow
      factor_low_name={data.dataJson.factor_low_name}
      school_name={data.dataJson.school_name}
    />
    <QuestionLow
      item_low_name={data.dataJson.item_low_name}
      school_name={data.dataJson.school_name}
    />

    </div>
  )
 }

export 
const query = graphql`
  query BlogPostQuery($slug: String!) {
    dataJson(fields: { slug: { eq: $slug } }) {
      factor_high_name
      response_count
      school_name
      factor_low_name
      item_low_name
      item_high_name
      response_rate
    }
  }
`;

