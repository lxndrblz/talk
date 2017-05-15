import React, {PropTypes} from 'react';

import Comment from './components/Comment';
import styles from './components/styles.css';
import EmptyCard from '../../components/EmptyCard';
import {actionsMap} from './helpers/moderationQueueActionsMap';
import I18n from 'coral-i18n/modules/i18n/i18n';

import LoadMore from './components/LoadMore';

const lang = new I18n();
class ModerationQueue extends React.Component {

  static propTypes = {
    bannedWords: PropTypes.arrayOf(PropTypes.string).isRequired,
    suspectWords: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentAsset: PropTypes.object,
    showBanUserDialog: PropTypes.func.isRequired,
    rejectComment: PropTypes.func.isRequired,
    acceptComment: PropTypes.func.isRequired,
    comments: PropTypes.array.isRequired
  }

  componentDidUpdate (prev) {
    const {loadMore, comments, commentCount, sort, activeTab: tab, assetId: asset_id} = this.props;

    // if the user just moderated the last (visible) comment
    // AND there are more comments available on the server,
    // go ahead and load more comments
    if (prev.comments.length > 0 && comments.length === 0 && commentCount > 0) {
      loadMore({sort, tab, asset_id});
    }
  }

  render () {
    const {comments, selectedIndex, commentCount, singleView, loadMore, activeTab, sort, ...props} = this.props;

    return (
      <div id="moderationList" className={`${styles.list} ${singleView ? styles.singleView : ''}`}>
        <ul style={{paddingLeft: 0}}>
          {
            comments.length
            ? comments.map((comment, i) => {
              const status = comment.action_summaries ? 'FLAGGED' : comment.status;
              return <Comment
                key={i}
                index={i}
                comment={comment}
                selected={i === selectedIndex}
                suspectWords={props.suspectWords}
                bannedWords={props.bannedWords}
                actions={actionsMap[status]}
                showBanUserDialog={props.showBanUserDialog}
                acceptComment={props.acceptComment}
                rejectComment={props.rejectComment}
                currentAsset={props.currentAsset}
                />;
            })
            : <EmptyCard>{lang.t('modqueue.empty_queue')}</EmptyCard>
          }
        </ul>
        <LoadMore
          comments={comments}
          loadMore={loadMore}
          sort={sort}
          tab={activeTab}
          showLoadMore={comments.length < commentCount}
          assetId={props.assetId}
          />
      </div>
    );
  }
}

export default ModerationQueue;
