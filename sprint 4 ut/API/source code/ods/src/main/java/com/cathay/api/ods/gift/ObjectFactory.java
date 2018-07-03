package com.cathay.api.ods.gift;

import javax.xml.bind.annotation.XmlRegistry;

import com.cathay.api.ods.gift.GetGiftData;

@XmlRegistry
public class ObjectFactory
{

  public GetGiftData createNEWACTISELXML(){
    return new GetGiftData();
  }
  
  public GetGiftDataResponse createNEWACTISELXMLResponse(){
    return new GetGiftDataResponse();
  }
}
