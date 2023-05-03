<script type="text/javascript" src="//cdn.evgnet.com/beacon/minnesotavikingsfootball/staging/scripts/evergage.min.js"></script>
<script type="text/javascript">
    let timerVar = setInterval(() => {
        if (typeof SalesforceInteractions != 'undefined') {

            SalesforceInteractions.init({

            }).then(() => {

                SalesforceInteractions.initSitemap({
                    global: {},
                    pageTypeDefault: {
                        name: "TicketmasterDefault",
                    },
                    pageTypes: [
                        {
                            name: 'TicketMaster Vikings Home Page',
                            interaction: {
                                name: 'TicketMaster Vikings Home Page'
                            },
                            isMatch: () => true
                        },
                    ]
                });   // Initializes the Sitemap
            });

            const sendUserId = () => {
                if (/persistUserId/.test(window.location.href)) {
                    try {
                        const urlParams = new URLSearchParams(window.location.search);
                        const anonId = urlParams.get('persistUserId');
                        if (anonId != undefined && anonId != '') {
                            SalesforceInteractions.sendEvent({
                                name: "Ticketmaster ID merge",
                                interaction: {name: "Ticketmaster ID merge"},
                                user: {
                                    identities: {
                                        persistId: anonId
                                    }
                                }
                            }) 
                        }
                    } catch (e) {
                        SalesforceInteractions.sendEvent({
                            name: "Ticketmaster ID merge Failed",
                            interaction: {name: "Ticketmaster ID merge Failed"}
                        })
                    }
                }

            }

            const abandonedCart = () => {
                SalesforceInteractions.DisplayUtils.pageExit(1000).then(() => {
                    SalesforceInteractions.sendEvent({
                        interaction: {
                            name: 'Abandoned Cart'
                        }
                    })
                })
            }

            abandonedCart();
            sendUserId();
        }
    }, 2000)
</script>
