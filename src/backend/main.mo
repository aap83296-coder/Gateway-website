import Types "types/content-management";
import ContentMixin "mixins/content-management-api";
import List "mo:core/List";



actor {
  let portfolioItems = List.empty<Types.PortfolioItem>();
  let services = List.empty<Types.Service>();
  let contactMessages = List.empty<Types.ContactMessage>();
  let state = { var nextPortfolioId = 0; var nextServiceId = 0; var nextMessageId = 0 };

  include ContentMixin(portfolioItems, services, contactMessages, state);
}

