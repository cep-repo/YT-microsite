import React from "react";
import styles from "../layouts/about-css-modules.module.css";
console.log(styles);



const SectionHigh = props =>
	<div className={styles.userFactor}>
	  <div className={styles.descriptionFactor}>
		<h1 className={styles.titleSection}> Highest Rated Summary Measure </h1>
		<p  className={styles.excerpt}> Respondents at <b>{props.school_name}</b> rated <b>{props.max_factor_name}</b> most positively when compared to other {props.level} schools in that also took the <b>{props.product}</b>. {props.max_factor_description} </p>
		<img className={styles.avatar} src={props.happy_gif}></img>
	  </div>
	</div>
const QuestionHigh = props =>
    <div className={styles.userItem}>
		<div className={styles.descriptionItem}>
		  <h1 className={styles.titleSection}> Highest Rated Question </h1>
		  <p className={styles.excerpt}> The <b>most positively rated</b> question by respondents at <b>{props.school_name}</b> was <b>"{props.max_item_name}"</b>. </p>
		  <img className={styles.avatar} src={props.happy_gif}></img>
		</div>
	</div>
const SectionLow = props =>
	<div className={styles.userFactor}>
	  <div className={styles.descriptionFactor}>
	    <h1 className={styles.titleSection}> Lowest Rated Summary Measure </h1>
		<p className={styles.excerpt}> Respondents at <b>{props.school_name}</b> rated <b>{props.min_factor_name}</b> least positively when compared to other {props.level} schools in that also took the <b>{props.product}</b>. {props.min_factor_description} </p>
		<img className={styles.avatar} src={props.sad_gif}></img>
	  </div>
	</div>
const QuestionLow = props =>
    <div className={styles.userItem}>
	  <div className={styles.descriptionItem}>
	    <h1 className={styles.titleSection}> Lowest Rated Question </h1>
		<p className={styles.excerpt}> The <b>least positively rated</b> question by respondents at <b>{props.school_name}</b> was <b>"{props.min_item_name}"</b>. </p>
		<img className={styles.avatar} src={props.sad_gif}></img>
	  </div>
	</div>
const Response = props =>
    <div className={styles.user}>
      <p className={styles.description}><b>{props.response_count}</b> {props.school_name} stakeholders responded to the YouthTruth <b>{props.product}</b>.</p>
	  <div className={styles.avatar}>
		  <svg width="100%" height="100%" viewBox="0 0 42 42" className="donut">
			<circle className="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
			<circle className="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#d2d3d4" strokeWidth="3"></circle>
			<circle className="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#0fb2cb" strokeWidth="3" strokeDasharray={props.response_rate_str}  strokeDashoffset="25"></circle>
			  <g className={styles.charttext}>
				<text x="50%" y="50%" className={styles.chartnumber}>
				  {props.response_rate}%
				</text>
				<text x="50%" y="45%" className={styles.chartlabel}>
				  Response Rate
				</text>
			  </g>
		  </svg>
	  </div>
    </div>
const FamResponse = props =>
    <div className={styles.user}>
      <p className={styles.description}><b>{props.response_count}</b> {props.school_name} stakeholders responded to the YouthTruth <b>{props.product}</b>.</p>
    </div>
const Title = props =>
	<div>
		<h1 className={styles.title}>{props.school_name}</h1>
			<h2 className={styles.title}> {props.product}</h2>
	</div>
const WordCloud = props =>
	<div className={styles.user}>
	  <div className={styles.descriptionFactor}>
		<h1 className={styles.titleSection}>Word Cloud from {props.school_name} Comments</h1>
		<img src={props.wordcloud_url}></img>
	  </div>
	</div>


export default ({ data }) =>{
	let response_comp
	if (data.dataJson.product=="family survey"){
		response_comp =<FamResponse
				response_count={data.dataJson.response_count}
				school_name={data.dataJson.school_name}
				product={data.dataJson.product}/> 
	}else{
		response_comp = <Response
				  response_count={data.dataJson.response_count}
				  response_rate={data.dataJson.response_rate}
				  school_name={data.dataJson.school_name}
				  response_rate_str={data.dataJson.response_rate_str}
				  product={data.dataJson.product}/>
	}
	return(
	  <div>
		<Title
		  school_name={data.dataJson.school_name}
		  product={data.dataJson.product}
		/>
		{response_comp}
		<SectionHigh
		  max_factor_name={data.dataJson.max_factor_name}
		  school_name={data.dataJson.school_name}
		  max_factor_description={data.dataJson.max_factor_description}
		  happy_gif={data.dataJson.happy_gif}
		  product={data.dataJson.product}
		  level = {data.dataJson.level}
		/>
		<QuestionHigh
		  max_item_name={data.dataJson.max_item_name}
		  school_name={data.dataJson.school_name}
		  happy_gif={data.dataJson.happy_gif}
		/>
		<SectionLow
		  min_factor_name={data.dataJson.min_factor_name}
		  school_name={data.dataJson.school_name}
		  min_factor_description={data.dataJson.min_factor_description}
		  sad_gif={data.dataJson.sad_gif}
		  product={data.dataJson.product}
		  level = {data.dataJson.level}
		/>
		<QuestionLow
		  min_item_name={data.dataJson.min_item_name}
		  school_name={data.dataJson.school_name}
		  sad_gif={data.dataJson.sad_gif}
		/>
		<WordCloud
			school_name={data.dataJson.school_name}
			wordcloud_url={data.dataJson.wordcloud_url}
		/>

	  </div>
	)
  }


export const query = graphql`
  query BlogPostQuery($slug: String!) {
    dataJson(fields: { slug: { eq: $slug } }) {
      max_factor_name
      response_count
      school_name
      min_factor_name
      min_item_name
      max_item_name
      response_rate
	  product
	  level
	  happy_gif
	  sad_gif
	  max_factor_description
	  min_factor_description
	  response_rate_str
	  wordcloud_url
    }
}
`

