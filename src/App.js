import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import { useEffect } from 'react';

function App() {
 
  useEffect(()=>{
      $(document).on( function() {
        //initialize the quiz options
        var answersLeft = [];
        $('.quiz-wrapper').find('li.option').each( function(i) {
          var $this = $(this);
          var answerValue = $this.data('target');
          var $target = $('.answers .target[data-accept="'+answerValue+'"]');
          var labelText = $this.html();
          $this.draggable( {
            revert: "invalid",
            containment: ".quiz-wrapper"
          });
         
          if ( $target.length > 0 ) {
          $target.droppable( {
              accept: 'li.option[data-target="'+answerValue+'"]',
              drop: function( event, ui ) {
                $this.draggable('destroy');
                $target.droppable('destroy');
                $this.html('&nbsp;');
                $target.html(labelText);
                answersLeft.splice( answersLeft.indexOf( answerValue ), 1 );
              }
          });
          answersLeft.push(answerValue);
          } else { }
         });
         $('.quiz-wrapper button[type="submit"]').on( function() {
           if ( answersLeft.length > 0 ) {
              $('.lightbox-bg').show();
            $('.status.deny').show();
            $('.lightbox-bg').on( function() {
                $('.lightbox-bg').hide();
              $('.status.deny').hide();
              $('.lightbox-bg').off('click');
            });
           } else {
              $('.lightbox-bg').show();
            $('.status.confirm').show();
           }
         });
      });
    },[]);
    
  return (
    <div className="quiz-wrapper">
        <p className="question-description">Fill in the blanks by dragging the missing answer.</p>
        <ul className="options">
          <li className="title">Options</li>
          <li className="option" data-target="carraway">Nick Carraway</li>
          <li className="option" data-target="fitz">F. Scott Fitzgerald</li>
          <li className="option" data-target="westegg">West Egg</li>
          <li className="option" data-target="buchanan">Tom Buchanan</li>
          <li className="option" data-target="daisy">Daisy</li>
          <li className="option" data-target="ashes">Valley of Ashes</li>
        </ul>
      <div className="answers">
        <ol>
          <li><span className="target" data-accept="fitz">&nbsp;</span>, a native of St Paul, Minnesota, and also a member of the "Lost Generation" finished four novels including "This Side of Paradise".</li>
          <li><span className="target" data-accept="carraway">&nbsp;</span> attended Yale with the large and brooding<span className="target" data-accept="buchanan">&nbsp;</span>.</li>
          <li>George Wilson owns an unsuccessful garage in an area known as the <span className="target" data-accept="ashes">&nbsp;</span>, where Tom brings Nick for a party.</li>
          <li>Jay Gatsby, the Buchanans, and Nick himself all make<span className="target" data-accept="westegg">&nbsp;</span>their home.</li>
        </ol>
      </div>
       <button type="submit" value="submit">Submit</button>
       <div className="lightbox-bg"></div>
       <div className="status confirm">
         <p>All Answers Answered</p>
       </div>
       <div className="status deny">
         <p>Answers Remain</p>
       </div>
      </div>
  );
}



export default App;
