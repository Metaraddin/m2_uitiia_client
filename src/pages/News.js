import {observer} from "mobx-react-lite";
import {Helmet} from "react-helmet";
// import {useEffect} from "react";

function News() {
    // const scriptPost = document.createElement('script')
    // scriptPost.src = 'https://telegram.org/js/telegram-widget.js?22'
    // scriptPost.setAttribute('data-telegram-post', 'm2_uitiia_channel/42')
    // scriptPost.setAttribute('data-width', '100%')
    // scriptPost.setAttribute('data-userpic', 'false')
    // scriptPost.setAttribute('data-dark', '1')
    // scriptPost.async = true
    // document.body.appendChild(scriptPost)

    // useEffect(() => {
    //     const scriptDiscussion = document.createElement('script')
    //     scriptDiscussion.src = 'https://telegram.org/js/telegram-widget.js?22'
    //     scriptDiscussion.setAttribute('data-telegram-discussion', 'm2_uitiia_channel/42')
    //     scriptDiscussion.setAttribute('data-comment-limit', '5')
    //     scriptDiscussion.setAttribute('data-dark', '1')
    //     scriptDiscussion.async = true
    //     document.body.appendChild(scriptDiscussion)
    // }, [])

    return (
        <div>
            {/* <Helmet>
                <title>Test</title>
                <script
                    async 
                    src="https://telegram.org/js/telegram-widget.js?22"
                    data-telegram-post="m2_uitiia_channel/42" 
                    data-width="100%"
                />
            </Helmet> */}
            <div>Новости</div>
        </div>
    );
}

export default observer(News)