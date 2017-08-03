import $ from 'jquery';
import { apiURL, apiHEADER, marketZone } from '../components/GlobalHelpers';

<<<<<<< HEAD
export function getVip(callback,id){
    $.ajax({
        'type':'GET',
        'url': apiURL.getVip+id,
        'success':function (result) {
            callback(result,true)
        },
        'error':function (result) {
            callback(result,false)
        }
    });
}

export function expandCustomer(callback,token,id){
    $.ajax({
        'type':'GET',
        'headers' : {'Authorization' : 'Bearer ' + token},
        'url': apiURL.expandCustomer+id+'&expand=customer',
        'success':function (result) {
            callback(result,true)
        },
        'error':function (result) {
            callback(result,false)
        }
    });
}

=======
>>>>>>> lim
export function hydraRequestByUrl(callback,token,url){
    $.ajax({
        'type':'GET',
        'headers' : {'Authorization' : 'Bearer ' + token},
        'url': url,
        'success':function (result) {
            callback(result,true)
        },
        'error':function (result) {
            callback(result,false)
        }
    });
}

export function getPeriod(callback,id,market){
    let data = {
        ba_id: id,
        country: market
    }
    $.ajax({
        'type':'POST',
        'url': apiURL.getPeriod,
        'data': data,
        'success':function (result) {
            callback(result,true)
        },
        'error':function (result) {
            callback(result,false)
        }
    })
}

export function checkToken(callback,token){
    $.ajax({
        'type':'GET',
        'headers' : {'Authorization' : 'Bearer ' + token},
        'url': apiURL.whoAmI,
        'success':function (result) {
            callback(result,true)
        },
        'error':function (result) {
            callback(result,false)
        }
    });
}

export function getProduct(callback){
    $.ajax({
        'type':'GET',
        'url': apiURL.getProducts,
        'success':function (result) {
            callback(result,true)
        },
        'error':function (result) {
            callback(result,false)
        }
    });
}

export function queryOrder(callback,token,href,orderUrl){
    $.ajax({
        'type':'GET',
        'url': apiURL.queryOrder+token+'&ssurl='+href+'&link='+orderUrl+'&market='+marketZone,
        'success':function (result) {
            callback(result,true)
        },
        'error':function (result) {
            callback(result,false)
        }
    });
}

export function reportOrder(callback,token,month){
    $.ajax({
        'type':'GET',
        'url': apiURL.orderHistory+token+'&month='+month,
        'success':function (result) {
            callback(result,true)
        },
        'error':function (result) {
            callback(result,false)
        }
    });
}

export function loginUser(callback,username,password){
    let data = {
        'type':'base64', 
        'value':btoa(username + ":" + password), 
        'namespace':'https://hydra.unicity.net/v5/customers'
    };
    $.ajax({
        'type':'POST',
        'headers': apiHEADER.preset1,
        'url': apiURL.loginTokens,
        'data': JSON.stringify(data),
        'success':function (result) {
            callback(result,true)
        },
        'error':function (result) {
            callback(result,false)
        }
    })
}

export function getSeminarData(callback,baid){
    let id = btoa(baid);
    $.ajax({
        'type':'GET',
        'url': apiURL.seminarData+id,
        'success':function (result) {
            callback(result,true)
        },
        'error':function (result) {
            callback(result,false)
        }
    });
}

export function sendFeedback(callback,message,email,baid){
    let data = "market="+marketZone+"&msg=From V2: "+message+"&baid="+baid+"&email="+email;
    $.ajax({
        'type':'POST',
        'url': apiURL.sendFeedback,
        'data': data,
        'success':function (result) {
            callback(result,true)
        },
        'error':function (result) {
            callback(result,false)
        }
    })
}

export function getCustomerData(callback,token,href){
        $.ajax({
            'type':'GET',
            'headers': {'Authorization':'Bearer '+ token},
            'url': href+"?expand=metricsProfile,metricsProfileHistory,profilePicture,achievementsHistory,cumulativeMetricsProfile",
            'success':function (result) {
                callback(result,true)
            },
            'error':function (result) {
                callback(result,false)
            }
        })
}

export function serviceGetNews(callback) {
    $.ajax({
        'type':'GET',
        'url': apiURL.getNews,
        'success':function (result) {
            let newsArray = [];
            for(var i in result){
                newsArray.push({
                    link: result[i].embed_video,
                    image: result[i].image,
                    hot: result[i].new_hot
                })
            }
            return callback(newsArray)
        },
        'error':function (result) {}
    })
}

export function serviceGetMedia(callback) {
    $.ajax({
        'type':'GET',
        'url': apiURL.getMedia,
        'success':function (result) {
            let mediaArray = [];
            for(var i in result){
                mediaArray.push({
                    link: result[i].embed_video,
                    image: result[i].image
                })
            }
            return callback(mediaArray)
        },
        'error':function (result) {}
    })
}